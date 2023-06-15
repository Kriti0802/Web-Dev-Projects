import Test from "../models/testModel.js";
import Question from "../models/questionModel.js";
import Answer from "../models/answerModel.js";
import UserResponse from "../models/userResponseModel.js";
import express from "express";
const router = express.Router();

export const addTests = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const createdQuestions = [];

    for (const question of questions) {
      const { text, answers, correctAnswers } = question;
      const createdAnswers = [];
      for (const answer of answers) {
        const { text, isCorrect } = answer;
        const answerObj = new Answer({ text, isCorrect });
        await answerObj.save();
        createdAnswers.push(answerObj);
      }

      const questionObj = new Question({ text });
      questionObj.answers = createdAnswers;
      questionObj.correctAnswers = createdAnswers
        .filter((answer) => answer.isCorrect)
        .map((answer) => answer._id.toString());

      await questionObj.save();

      createdQuestions.push(questionObj);
    }

    const testObj = new Test({
      title,
      description
    });
    testObj.questions = createdQuestions;
    await testObj.save();
    res.status(201).json({
      success: true,
      message: "Test created successfully",
      testObj
    });
  } catch (error) {
    console.log(`Error in posting test ${error}`);
  }
};

export const submitTest = async (req, res) => {
  try {
    const { userId, testId, responses } = req.body;

    // Check if the user has already taken the test
    const existingResponse = await UserResponse.findOne({ userId, testId });
    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: "You have already taken this test."
      });
    }

    // Fetch the test details from the database
    const test = await Test.findById(testId).populate({
      path: "questions",
      populate: {
        path: "answers",
        model: "Answer"
      }
    });
    console.log("test data is")
    console.log(test);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found."
      });
    }

    let score = 0;

    // Iterate over the responses and calculate the score
    for (const response of responses) {
      const { questionId, answerIds } = response;

      // Find the question in the test
      const question = test.questions.find(
        (question) => question._id.toString() === questionId
      );

      if (!question) {
        return res.status(400).json({
          success: false,
          message: "Invalid question ID."
        });
      }

      // Get the correct answer IDs for the question
      const correctAnswerIds = question.correctAnswers;

      // Check if the user's answer matches the correct answer
      const isAnswerCorrect =
      correctAnswerIds.length === answerIds.length &&
      correctAnswerIds.every((id) => answerIds.includes(id.toString())); // Convert id to string for comparison

      if (isAnswerCorrect) {
        score++;
      }
    }

    // Save the user's response in the database
    const userResponse = new UserResponse({
      userId,
      testId,
      responses,
      score
    });
    await userResponse.save();

    res.status(200).json({
      success: true,
      message: "Test submitted successfully.",
      userId,
      testId,
      score
    });
  } catch (error) {
    console.log(`Error in submitting test: ${error}`);
    res.status(500).json({
      success: false,
      message: "An error occurred while submitting the test."
    });
  }
};
