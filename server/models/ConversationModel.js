const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Conversation", conversationSchema);
