const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocialChallengeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  modify: { type: String, enum: ["hp", "exp", "both"] },
  difficulty: { type: String, enum: [1, 3, 5] },
  image: { type: String },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const SocialChallenge = mongoose.model("SocialChallenge", SocialChallengeSchema);

module.exports = SocialChallenge;