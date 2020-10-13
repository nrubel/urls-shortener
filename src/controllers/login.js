const {User} = require('../utils/db')
const _p = require('../utils/promise_errors')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {check} = require('express-validator')
const {validate} = require('../utils/passwords')
const {app_secret} = require('../config.json')
const rejectInvalid = require('../middlewares/reject_invalid')

const loginValidator = [check('email').isEmail(), check('password').isLength({min: 5})]

router.post('/login', loginValidator, rejectInvalid, async (req, res, next) => {
    let {password, email} = req.body
    let [uer, user] = await _p(User.findOne({
        where: {
            email
        }
    }))

    if( !user && uer ){
        // res.status(401).json({error: true, message: "User not found"})
        return next(uer)
    }
    else{
        let [salt, hash] = user.password.split('.')
        let {name, email, id} = user
        let valid = validate(password, hash, salt)
        if( valid ){
            let token = jwt.sign({id, name, email}, app_secret)
            res.json({
                error: false,
                token,
                user: {
                    id, name, email
                }
            })
        }else{
            // res.status(401).json({error: true, message: "Password incorrect"})
            next(new Error("Password Invalid"))
        }
    }
})

module.exports = router