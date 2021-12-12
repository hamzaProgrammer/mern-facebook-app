const Users = require('../models/UserSchema')
 const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const registerUser = async (req,res) => {
    //const { password , username , email  , profilePic , coverPic , isAdmin  } = req.body

    const { password , username , email } = req.body

    const check = await Users.find({ $or: [ {email: email} , { username: username}]})
    if(check.length > 0 ){
        res.json({message: '*** UserName or Email Already taken ***'})
    }else{
        const hashedPassword = await bcrypt.hash(password, 12); // hashing password

        const newUser = new Users({ username , email , password: hashedPassword })

        try {
            const addedUser = await newUser.save();

            res.status(201).json({addedUser , message: ''})
        } catch (error) {
                console.log("Error in registerUser and error is : ", error)
        }
    }
}


// Logging In
const LogInUser = async (req, res) => {
    const { email ,  password } = req.body

        try {
            const isUserExists = await Users.findOne({email});

            if(!isUserExists){
                return res.json({ message: "*** User Not Found ***"})
            }

            const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password); // comparing password
            if (!isPasswordCorrect) {
                return res.json({
                    message: '*** Invalid Credientials ***'
                })
            }

            const token = jwt.sign({id: isUserExists._id} , JWT_SECRET_KEY , {expiresIn: '5d'}); // gentating token

            res.json({
                myResult: isUserExists,
                message: '',
                token
            });
        } catch (error) {
            console.log("Error in getSingleRecord and error is : ", error)
        }

}

module.exports = {
    registerUser,
    LogInUser
}