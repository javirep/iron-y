const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocialChallengeSchema = new Schema ({
  name: {type: String, required: true}, 
  description: {type: String, required: true},
  modify: {type: String, enum: ["hp", "exp", "both"]},
  difficulty: {type: String, enum: [ "easy", "medium", "hard"]}, 
  image: { type: String, default: "https://cdn.pixabay.com/photo/2017/05/10/17/33/mental-2301393_960_720.jpg"}
}, {
  timestamps:{
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const SocialChallenge = mongoose.model("SocialChallenge", SocialChallengeSchema);

module.exports = SocialChallenge;