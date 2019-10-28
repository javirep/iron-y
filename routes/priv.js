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

  res.render("priv/profile.hbs", { user })
});

/* GET users listing. */
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

})

router.get("/editPersonalChallenge/:id", (req, res, next) => {
  const { id } = req.params
  PersonalChallenge.findById(id)
    .then(personalChallenge => {
      res.render("priv/editPersonalChallenge", { personalChallenge })
    })
})

router.post("/editPersonalChallenge/:id", (req, res, next) => {
  const { id } = req.params
  const { name, description, modify, difficulty } = req.body

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




router.get("/socialChallenges", (req, res, next) => {
  SocialChallenge.find()
    .then(data => {
      res.render("priv/socialChallenges.hbs", { data })
      console.log(data)
    })

    .catch(error => { console.log('Error finding socialChallenge', error) })
})


router.get('/socialChallengeDetail/:id', (req, res, next) => {
  const { id } = req.params;
  SocialChallenge.findById(id)
    .then(data => { res.render("priv/socialChallengeDetail.hbs", { data }) })
    .catch(error => { console.log('Error finding socialChallenge', error) })
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

//NO FUNCIONA!!
router.post('/socialChallenge/delete/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser;
  User.findById(userId)
    .then(user => {
      const i = user.socialChallenges.indexOf(id)
      if (i !== -1) { user.socialChallenges.splice(i, 1) }

      res.redirect('/priv/user')
    })
    .catch(error => {
      console.log("error while finding the current user and deleting the social challenge: " + err)
    })
})




module.exports = router;