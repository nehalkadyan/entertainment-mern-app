const User = require("../models/userModel")
const dotenv = require("dotenv")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
// configuration for .env file
dotenv.config()

// controller function for signup
module.exports.signup = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        // signup validation
        if(!email || !password){
            throw new Error("not complete credentials")
        }
        // hashing the password before storing in database
        const hashedPassword = bcryptjs.hashSync(password, 10);
    
        // creating new user
        const newUser = new User({
            email : email,
            password : hashedPassword
        })
    
        // storing the new user in the database
        await newUser.save();
        // responding with newuser
        res.json(newUser)
    }catch(err){
        // handling error
       throw new Error(err)
    }

}

// controller function for signin
module.exports.signin = async (req, res) => {
    const {email, password} = req.body;
    console.log("password", password)

    try{
        // signin validation
        const validUser = await User.findOne({email});
        console.log("validUser.password",validUser.password)
        if(!validUser){
            return res.status(404).json({message : "User not found"})
        }
        // comparing the hashed password with actual password
        const validPassword = await bcryptjs.compare(password, validUser.password);
       
        if(!validPassword){
            return res.status(401).json({message : "Invalid credentials"})
        }
         
        // generating a token using jsonwebtoken library
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET);
        const {password : pass,  ...rest} = validUser._doc;
        //storing the cookie
        res.cookie('token', token, {
            httpOnly : true
        })
        res.json(rest);

    }catch(err){
          // handling error
          console.log(err)
          res.status(500).json({message : "Internal Server Error"});
    }

}

// controller function for logout
module.exports.logout = async (req, res) => {
    try{
        // resetting the cookie to ""
        res.cookie("token", "", {
            httpOnly : true,
            expires : new Date(0)
        });

        res.status(200).json({message : "User successfully logged out"})
    }catch(err){
        // handling error
        console.error(err);
        res.status(500).json({message : "Internal Server Error"})
    }
}



