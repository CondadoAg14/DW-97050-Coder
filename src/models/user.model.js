import mongoose from "mongoose"

const schema = new mongoose.Schema({

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user"
  },

  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts"
  }

}, { timestamps: true })

export default mongoose.model("users", schema)