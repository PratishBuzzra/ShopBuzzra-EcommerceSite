const express = require('express')
const {registerController, loginController, testController} = require('../controller/authController')
const router = express.Router()
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware')

//register
router.post('/register', registerController)

//login
router.post('/login', loginController)

//test routes
router.get('/test',requireSignIn,isAdmin, testController)

//protected route auth
router.get('/user-auth', requireSignIn ,(req, res)=>{
    res.status(200).send({ ok: true})
})

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin,(req, res)=>{
    res.status(200).send({ ok: true})
})



module.exports = router