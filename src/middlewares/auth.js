const jwt = require('jsonwebtoken')
const {app_secret} = require('../config.json')

module.exports = (req, res, next) => {
    if( !req.header('auth-token') )
        next(new Error("User not authenticated"))
    
    let token = req.header('auth-token')
    jwt.verify(token, app_secret, (err, userInfo) => {
        if( err )
            return next(err)
        else{
            req.user = userInfo
            next()
        }
    })
}