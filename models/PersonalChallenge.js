const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonalChallengeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  modify: { type: String, enum: ["hp", "exp", "both"] },
  difficulty: { type: String, enum: [1, 3, 5] },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const PersonalChallenge = mongoose.model("PersonalChallenge", PersonalChallengeSchema);

module.exports = PersonalChallenge