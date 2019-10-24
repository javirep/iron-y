const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}, 
  motivSentence: {type: String, required: true},
  imgPath: String,
  hp: {type: Number, default: 50},
  exp: {type: Number, default: 0},
  personalChallenges: [ { type: Schema.Types.ObjectId, ref: "PersonalChallenge"} ],
  socialChallenges: [ { type: Schema.Types.ObjectId, ref: "SocialChallenge"} ]
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;