const users = require("./Models/userModel");
const jwt = require('jsonwebtoken')

//register
exports.register = async (req,res)=>{
    console.log("Inside register request");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        //check email is present db or not
        const existingUser = await users.findOne({email})
        //if email is present then existing user
        if(existingUser){
            res.status(406).json("User alredy exists")
        }else{
            //else store / insert data to db
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            //to store data to mongodb from mongoose model
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)

    }

    
}

//login
exports.login = async (req,res)=>{
    console.log("Inside login function");
    const{email,password}= req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //user can login
            //generate token
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({
                existingUser,
                token
            })
            
        }else{
            res.status(404).json("Incorrect Email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}


//update profile
exports.editUser = async (req,res)=>{
    const userId = req.payload
    const{username,email,password,github,linkedin,profileImage} = req.body
    const profile = req.file?req.file.filename:profileImage
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
}