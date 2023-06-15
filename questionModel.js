import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text:{
    type:String,
    required:true
  },
  answers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Answer'
  }],
  correctAnswers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Answer'
  }]
})

const Question=mongoose.model('Question',questionSchema);
export default Question;