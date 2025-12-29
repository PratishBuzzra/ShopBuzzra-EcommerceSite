const userModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerController = async (req, res)=>{
    try {
        const { username, email, password} = req.body

 

        //validation
        if(!username){
            return res.send({message: 'Name is required'})    
        }
          if(!email){
            return res.send({message: 'email is required'})    
        }
          if(!password){
            return res.send({message: 'password is required'})    
        }
         

       //check existing user
        const checkExistingUser = await userModel.findOne({email})

        if(checkExistingUser){
             return res.status(400).json({
                success: false,
                message: 'user with email alaready exist'
            })
        }
        

        //hashpassword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const newlycreatedUser = new userModel({
            username,
            email,
            password: hashedPassword
        })
        await newlycreatedUser.save()

        if(newlycreatedUser){
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                newlycreatedUser
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'Unable to register user'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured in registration',
            error
        })
        
    }
}


const loginController = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: 'Email and password are required'
    });
}

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User with that email is not found please register'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'invalid password'
            })
        }

        //token
        const accessToken = jwt.sign({
            _id : user._id,
            username: user.username
        }, process.env.JWT_SECRET_KEY, {expiresIn: '7d'})
        
        res.status(200).json({
            success: true,
            message: 'Login successfull',
            authToken: accessToken,
            user: {
                username: user.username,
                email: user.email,
                 role: user.role
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong please try again'
        })
        
        
    }
}

const testController = async (req, res)=>{
    try {
        res.send('Protected routes')
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {registerController, loginController, testController}