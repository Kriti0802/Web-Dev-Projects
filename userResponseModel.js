import mongoose from "mongoose";

const userResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answerIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
        required: true,
      }],
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

export default UserResponse;
