const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}, 
  motivSentence: {type: String, default: "This is my super awesome motivational sentence."},
  imgPath: { type: String, default: "https://iphone-image.apkpure.com/v2/app/3/d/f/3df711b97c9418f7eb8b7f74db4021d4.jpg"},
  hp: {type: Number, default: 50},  //Stands for Health points
  exp: {type: Number, default: 0},  //Stands for exp.
  personalChallenges: [ { type: Schema.Types.ObjectId, ref: "PersonalChallenge"} ],
  socialChallenges: [ { type: Schema.Types.ObjectId, ref: "SocialChallenge"} ]
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;