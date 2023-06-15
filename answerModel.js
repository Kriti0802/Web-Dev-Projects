import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  text:{
    type:String,
    required:true,
  },
  isCorrect:{
    type:Boolean,
    required:true,
  }
})

const Answer=mongoose.model('Answer',answerSchema);
export default Answer;