const jwt = require('jsonwebtoken')
const {app_secret} = require('../config.json')

module.exports = (req, res, next) => {
    let token = req.header('auth-token')
    if( !token )
        next(new Error("User not authenticated"))
        // return res.status(401).json({
        //     error: true,
        //     message: "User not authenticated"
        // })
    
    jwt.verify(token, app_secret, (err, userInfo) => {
        if( err )
            return next(err)
            // return res.status(401).json({
            //     error: true,
            //     message: "User not authenticated"
            // })
        else{
            req.user = userInfo
            console.log(userInfo)
            next()
        }
    })
}