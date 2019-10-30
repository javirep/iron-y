var express = require('express');
var router = express.Router();

const User = require("../models/User")
const PersonalChallenge = require("../models/PersonalChallenge")
const SocialChallenge = require("../models/SocialChallenge")

// ESTE ES EL MIDDLEWARE QUE SE ASEGURA DE QUE SOLO LOS CURRENT USERS PUEDAN ACCEDER AL CONTENIDO PRIVATE

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    console.log("redirected to login by the middleware")
    res.redirect("/auth/login")
  }
})

router.get('/user', async (req, res, next) => {
  const id = req.session.currentUser._id

  const user = await User.findOne({ "_id": id })
    .populate("personalChallenges")
    .populate("socialChallenges")
  user.bar = user.hp * 2
  res.render("priv/profile.hbs", { user })
});

/* PERSONAL CHALLENGES ROUTES */
router.get("/addPersonalChallenge", (req, res, next) => {
  res.render("priv/addPersonalChallenge.hbs")
})

router.post("/addPersonalChallenge", (req, res, next) => {
  console.log("entered the route")
  const { name, description, modify, difficulty } = req.body
  const personalChallenge = new PersonalChallenge({
    name,
    description,
    modify,
    difficulty
  })
  personalChallenge.save(function (err, personalChallenge) {
    if (err) return console.error(err);
    console.log(personalChallenge.name + " saved in the DB.");
  });

  User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $push: { personalChallenges: personalChallenge.id } }, { new: true })
    .then(user => console.log("I dont know what this is for, but without this then it doesn't work"))

  res.redirect("/priv/user/")
})

router.get("/deletePersonalChallenge/:challengeId", (req, res, next) => {
  const { challengeId } = req.params
  console.log(challengeId)
  PersonalChallenge.findByIdAndDelete(challengeId)
    .then(personalChallenge => console.log("The following Personal challenge has been deleted: " + personalChallenge))
    .catch(err => console.log("error while finding and deleting the personal challenge: " + err))

  console.log("previusly user: " + req.session.currentUser)

  User.findByIdAndUpdate({ "_id": req.session.currentUser._id }, { $pull: { personalChallenges: challengeId } })
    .then(() => res.redirect("/priv/user/"))
    .catch(err => console.log("error while deleting a personal challenge from DB: " + err))
})

router.get("/editPersonalChallenge/:id", (req, res, next) => {
  const { id } = req.params
  PersonalChallenge.findById(id)
    .then(personalChallenge => {
      res.render("priv/editPersonalChallenge", { personalChallenge })
    })
})

router.post("/editPersonalChallenge/:id", (req, res, next) => {
  console.log("going the right route")
  const { id } = req.params
  const { name, description, modify, difficulty } = req.body

  if (!name || !description || !modify || !difficulty) {
    console.log("missing fields")

    //esta pagina no redirige... 
    res.render("auth/login.hbs")

    console.log("Why is this being printed?")

    // me encantaría hacer un res.render con un error message, pero no funciona.
    /*PersonalChallenge.findById(id)
      .then(personalChallenge => {
        console.log("entered the then")
        personalChallenge.errorMessage = "You have to fill all the fields of the form"
        res.redirect("/")
      })
      .catch(err => "error editing the personal challenge: " + err)*/
  }

  console.log("exited the if")

  PersonalChallenge.update({ "_id": id }, {
    $set: {
      name, description, modify, difficulty
    }
  })
    .then(() => res.redirect("/priv/user"))
    .catch(err => console.log("error updating the personal challenge: " + err))
})

router.get("/user/personalChallenge/:id", (req, res, next) => {
  const { id } = req.params;
  PersonalChallenge.findOne({ "_id": id })
    .then(personalChallenge => {
      res.render("priv/personalChallengeDetail.hbs", { personalChallenge })
    })
})

router.post("/achievedPersonalChallenge/:id", async (req, res, next) => {
  const challengeId = req.params.id;

  const personalChallenge = await PersonalChallenge.findById(challengeId)

  if (personalChallenge.modify === "hp" || personalChallenge.modify === "both") {
    const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $inc: { hp: personalChallenge.difficulty } }, { new: true })

    if (userUpdated.hp > 50) {
      console.log("Live cannot be over 50 hp")
      const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $set: { hp: 50 } }, { new: true })
    }
    req.session.currentUser = userUpdated
  }

  if (personalChallenge.modify === "exp" || personalChallenge.modify === "both") {
    const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $inc: { exp: personalChallenge.difficulty } }, { new: true })

    req.session.currentUser = userUpdated
  }

  res.redirect("/priv/user")
})

router.post("/failedPersonalChallenge/:id", async (req, res, next) => {
  const challengeId = req.params.id;

  const personalChallenge = await PersonalChallenge.findById(challengeId)

  if (personalChallenge.modify === "hp" || personalChallenge.modify === "both") {
    const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $inc: { hp: -personalChallenge.difficulty } }, { new: true })

    req.session.currentUser = userUpdated
  }

  res.redirect("/priv/user")
})

// SOCIAL CHALLENGES ROUTES 

router.get("/socialChallenges", async (req, res, next) => {
  try {

    const { _id } = req.session.currentUser
    const data = await SocialChallenge.find()
    const challengesFromUser = await User.findOne({ _id })
    const newChallenges = []

    for (challenge of data) {
      let iHaveIt = false
      challengesFromUser.socialChallenges.forEach(userC => {
        if (challenge._id.equals(userC._id)) {
          iHaveIt = true
        }
      })
      if (!iHaveIt) {
        newChallenges.push(challenge)
      }
    }
    // if(newChallenges.length === 0){

    // }
    res.render("priv/socialChallenges.hbs", { newChallenges })
  }
  catch (error) {
    console.log('Error finding socialChallenge', error)
  }

})


router.get('/socialChallengeDetail/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const usersWithChallenge = await User.find({ socialChallenges: id })
    console.log(usersWithChallenge)
    const data = await SocialChallenge.findById(id)
    res.render("priv/socialChallengeDetail.hbs", { data, usersWithChallenge })
  }
  catch (error) {
    console.log('Error finding socialChallenge', error)
  }
})



router.post('/addSocialChallenge/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser;
  SocialChallenge.findById(id)
  User.findOneAndUpdate({ "_id": userId }, { $push: { socialChallenges: id } }, { new: true })
    .then(challenge => console.log(challenge))
  res.redirect("/priv/socialChallenges")
    .catch(error => { console.log(error) })
})


router.get('/socialChallenge/delete/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate({ "_id": userId }, { $pull: { socialChallenges: id } })
    .then(() => res.redirect('/priv/user/'))
});

router.post("/achievedSocialChallenge/:id", async (req, res, next) => {
  const challengeId = req.params.id;

  const socialChallenge = await SocialChallenge.findById(challengeId)

  if (socialChallenge.modify === "hp" || socialChallenge.modify === "both") {
    const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $inc: { hp: socialChallenge.difficulty } }, { new: true })

    if (userUpdated.hp > 50) {
      console.log("Live cannot be over 50 hp")
      const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $set: { hp: 50 } }, { new: true })
    }
    req.session.currentUser = userUpdated
  }

  if (socialChallenge.modify === "exp" || socialChallenge.modify === "both") {
    const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $inc: { exp: socialChallenge.difficulty } }, { new: true })

    req.session.currentUser = userUpdated
  }

  res.redirect("/priv/user")
})

router.post("/failedSocialChallenge/:id", async (req, res, next) => {
  const challengeId = req.params.id;

  const socialChallenge = await SocialChallenge.findById(challengeId)

  if (socialChallenge.modify === "hp" || socialChallenge.modify === "both") {
    const userUpdated = await User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $inc: { hp: -socialChallenge.difficulty } }, { new: true })

    req.session.currentUser = userUpdated
  }

  res.redirect("/priv/user")
})

router.get("/editProfile", (req, res, next) => {
  res.render('priv/editProfile.hbs')
})

module.exports = router;