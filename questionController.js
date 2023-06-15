import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const generateToken=({email,password})=>{
    const tokenPayload={
        email,password
    }
    const token=jwt.sign({
       tokenPayload
    },
    "secret123",{
        expiresIn:"100h"
    });

    return token;

}
export const welcome = (req, res) => {
  {
    try {
      res.status(200).json({
        success: true,
        message: "API called successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while calling API"
      });
    }
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      res.status(401).send({
        success: "false",
        message: "Please enter all the fields"
      });
    }
    const saltRounds = 10;
    //generating salt for hashing
    const salt = await bcrypt.genSalt(saltRounds);

    //hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone
    });

    userData.save();

    const token=generateToken({email:email,password:password});

    res.status(200).json({
      success: true,
      message: "Signed up successfully",
      token:token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in signing up"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send({
        success: "false",
        message: "Please enter your email address"
      });
    }
    const existingUser =await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid password"
      });
    }

    
    const token=generateToken(existingUser);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token:token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json(error
    );
  }
};


export const editPhoneNumber=async(req,res)=>{
    try{
        const {phone}=req.body;

        if(!phone)
        {
            return res.status(40).json({
                success:false,
                message:"Please enter a phone number for put request"
            });
        }

        const token=req.headers.authorization;
        const decodedToken=jwt.verify(token,'secret123');
        const {email}=decodedToken.tokenPayload;
        console.log(`token: ${token} decodedToken:`);
        console.log(decodedToken)

        
        const updatedUser=await userModel.findOneAndUpdate({email:email},{phone:phone},{new:true});
        if(!updatedUser)
        {
            return res.status(404).json({
                success:false,
                message:"User not found and updated"
            })
        }
        res.status(200).json({
            success:true,
            message:"Phone number updated successfully",
            updatedUser:updatedUser,
        })

    }
    catch(error)
    {
        res.status(400).json({
            success:false,
            message:"Error in editing phone number"
        }) 
    }
}