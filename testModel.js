import mongoose from 'mongoose'

const testSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  questions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Question"
  }]
})

const Test=mongoose.model('Test',testSchema);
export default Test;