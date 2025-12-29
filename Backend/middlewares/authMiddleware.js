const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');


//protected routes token base

const requireSignIn = async (req, res, next)=>{
    try {

         const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized access: Token missing or malformed',
      });
    }

    // Extract token string after 'Bearer '
    const token = authHeader.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decode;
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: 'Unauthorized acess'
        })
        
    }

}

//admin access
const isAdmin = async (req, res, next)=>{
    try {
        const user = await userModel.findById(req.user._id)

          if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

        if(user.role !== 1){
            return res.status(403).send({
                success: false,
                message: 'UnAuthorized access'
            })
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in admin middleware'
        })
        
    }
}

module.exports = {requireSignIn, isAdmin};