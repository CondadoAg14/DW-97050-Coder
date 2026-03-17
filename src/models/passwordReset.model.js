import mongoose from "mongoose"

const schema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },

  token: {
    type: String,
    required: true,
    unique: true
  },

  expires: {
    type: Date,
    required: true
  }

}, { timestamps: true })

export default mongoose.model("passwordResets", schema)