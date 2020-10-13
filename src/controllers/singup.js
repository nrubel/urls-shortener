const router = require('express').Router()
const {check} = require('express-validator')
const {generate} = require('../utils/passwords')
const {User} = require('../utils/db')
const _p = require('../utils/promise_errors')
const rejectInvalid = require('../middlewares/reject_invalid')

const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min: 5})
]

router.post('/signup', signupValidator, rejectInvalid, async (req, res, next) => {
    let chunks = generate(req.body.password)
    let password = `${chunks.salt}.${chunks.hash}`

    let {name, email} = req.body
    let [ucErr, userCreated] = await _p(User.create({
        name, email, password
    }))

    if( ucErr && !userCreated )
        return next(ucErr)
        // res.status(400).json({
        //     error: true, 
        //     message: ucErr.message
        // })
    else
        res.json({error: false, message: "User created"})

})

module.exports = router