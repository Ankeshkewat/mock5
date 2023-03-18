const {UserModel}=require('../model/User.model')

const UserMiddleware= async(req,res,next)=>{
     try{
        const {name,email,password}=req.body;
        if(!name||!email||!password) return res.status(401).json({'msg':"Please provide all deatails"})
        let data=await UserModel.find({email});
        if(data.length>0)return res.status(401).json({'msg':"User already exits"})
        next()
     }
     catch(err){
        console.error(err)
        res.status(500).json({'msg':"Something went wrong check the details your are providing"})

     }
}

const LoginMiddleware= async(req,res,next)=>{
     try{
        const {email,password}=req.body;
        if(!email||!password) return res.status(401).json({'msg':"Please provide all deatails"})
        let data=await UserModel.find({email});
        if(data.length==0)return res.status(401).json({'msg':"User Not exits"})

        next()
     }
     catch(err){
        console.error(err)
        res.status(500).json({'msg':"Something went wrong check the details your are providing"})

     }
}

module.exports={UserMiddleware, LoginMiddleware}