const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const auth = (req,res,next)=>{
    if(req.method==="OPTIONS"){
        return next();
    };

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token)
      {
        return next(new HttpError("Auth failed",402));
      }  else{
     
            const decodedToken = jwt.verify(token,"lolakslddfjsfbmncvmencmdsjsndjcmwtfrohanpoopsurgecnanda");
            req.userData = {
                userId:decodedToken.id
            }
            next(); 
    }
}catch(err){
        return next(new HttpError("Auth failed",402));
      };
 
  
}

module.exports = auth;
