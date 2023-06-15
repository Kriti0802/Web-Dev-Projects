import mongoose from "mongoose";

const loginSchema=new mongoose.Schema({
    
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

const loginModel=mongoose.model("loginData", loginSchema);
export default loginModel;
