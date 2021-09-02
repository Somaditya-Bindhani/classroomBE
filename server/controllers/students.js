const {validationResult} = require("express-validator");
const HttpError = require("../models/http-error");
const Student = require("../models/student-model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req,res,next)=>{
    const errors = validationResult(req);
    let existingUser;

    let imagePath;
    if(!errors.isEmpty())
    {  
        return next(new HttpError("Invalid Inputs.Please fill the form correctly ",501));
    }

    if(req.body.password!==req.body.confirmPassword)
    {
        return next(new HttpError("Password and Confirm Password does not match",502));
    }
    const {name,email,password,college,dob} = req.body;

    

    try{
            existingUser = await Student.findOne({email:email});
          
        
    }catch(err){
       
        return next(new HttpError("Could not create account.Try Again",503));
    }

    if(existingUser){
      
        return next(new HttpError("User exist.Try again later",500));
    }
    let hashedPassword;
    try{
       
        hashedPassword = await bcrypt.hash(password,12);
       
        
    }catch(err)
    {   
        return next(new HttpError("Could not create account.Try Again",506));
    }
    if(!req.file)
    {
        imagePath = "uploads\\images\\default-profile-picture1.jpg"
    }else{
        imagePath=req.file.path;
    }
    const studentDetails = new Student({
        name,
        email,
        password:hashedPassword,
        college:college || "Not-Seted",
        image:imagePath ,
        dob:dob || "Not-Seet",
        subjects:[]

    });
  
 

    try{    
     
    
        await studentDetails.save();
    }catch(err){
      
        return next(new HttpError("Could not create account.Try Again",507));
    }


let token;
try{
    token = await jwt.sign({email:studentDetails.email,id:studentDetails.id},"lolakslddfjsfbmncvmencmdsjsndjcmwtfrohanpoopsurgecnanda",{expiresIn:"1h"});
}catch(err)
{
    return next(new HttpError("Could not create account.Try Again",500));
}

    return res.json({id:studentDetails.id,email:studentDetails.email,token:token});

}

const login = async (req,res,next)=>{
    const errors = validationResult(req);
    let existingUser;
    if(!errors.isEmpty())
    {
        return next(new HttpError("Invalid Inputs.Please fill the form correctly ",500));
    }
const {email,password} = req.body;

try{

    existingUser = await Student.findOne({email:email});


}catch(err){
    
    return next(new HttpError("Could not log you in,try again"),401);
}



if(!existingUser)
{
    return next(new HttpError("Invalid credentials"),401);
}

let passIsValid=false;

try{
    passIsValid = await bcrypt.compare(password,existingUser.password);
}catch(err)
{
    return next(new HttpError("Invalid credentials"),401);
}

if(!passIsValid)
{
    return next(new HttpError("Invalid credentials"),401);
}

let token;
try{
    token = await jwt.sign({email:existingUser.email,id:existingUser.id},"lolakslddfjsfbmncvmencmdsjsndjcmwtfrohanpoopsurgecnanda",{expiresIn:"1h"});
}catch(err)
{
    return next(new HttpError("Could not log you in.Try Again",500));
}

    return res.json({id:existingUser.id,email:existingUser.email,token:token});

}


const profileData = async (req,res,next)=>{
   
    const studentId = req.params.studentId;
    const tokenUserId = req.userData.userId;
 
    let existingUser;

    if(!( tokenUserId=== studentId))
    {  
        return next(new HttpError("Authorization failed",402));
    }

    try{
         existingUser = await Student.findById(tokenUserId);
    }catch(err)
    {
        return next(new HttpError("Authorization failed",402));
    };
    if(!existingUser)
    {
        return next(new HttpError("Authorization failed",402));
    }

    res.json({name:existingUser.name,college:existingUser.college,image:existingUser.image,email:existingUser.email});

}


module.exports.signup = signup;
module.exports.login = login;
module.exports.profileData = profileData;