const express=require('express')
const bcrypt=require("bcrypt")
const userModel=require("../models/userModel")
const userRoutes=express.Router()
const jwt=require("jsonwebtoken")
require("dotenv").config()

userRoutes.post('/register',async (req,res)=>{
    const rawPass=req.body.password;
    encPass=await bcrypt.hash(rawPass,10);

    let user=new userModel({...req.body,password:encPass})//raw pass is overwrite by encrypted password
    await user.save();

    res.send({msg:"Registration Successful",status:true})
})

//user->payload
const generateAccessToken=(payload)=>{
    return jwt.sign(payload,`${process.env.ACCESS_SECRET_KEY}`,{expiresIn:'1h'})
}


userRoutes.post('/login',async(req,res)=>{
    let data=req.body;
    // console.log(data)
    let userData=await userModel.find({user_name:data.username})
    // console.log(userData)//terminal mae show karega array mae object,agar match nahi hoga toh empty array return hoga

    if(userData.length<=0)
    {
        res.json({msg:"user doesn't exist or the credential is wrong"})
    }
    else
    {
        let user = userData[0];
        
        let result=await bcrypt.compare(data.password,user.password)//true or false
        
        if(result)
        {
            // console.log(user);

            let access_token= generateAccessToken(user.toJSON())//stringify sae JSON mae convert kiyae hai
            res.json({msg:"Login Success",status:true,token:access_token})
        }
        else
        {
            res.json({msg:"Login Failed",status:false})
        }
    }

})



module.exports=userRoutes;