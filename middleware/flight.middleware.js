
const Flightmiddleware= async(req,res,next)=>{
     try{
        const {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body;
        if(!airline||!flightNo||!departure||!arrival||!departureTime||!arrivalTime||!seats||!price) return res.status(401).json({'msg':"Please provide all deatails"})
        next()
     }
     catch(err){
        console.error(err)
        res.status(500).json({'msg':"Something went wrong check the details your are providing"})

     }
}



module.exports={Flightmiddleware }