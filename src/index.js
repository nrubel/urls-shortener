const express = require('express')
const bp = require('body-parser')
const signup = require('./controllers/singup')
const login = require('./controllers/login')
const redirect = require('./controllers/redirect')
const auth = require('./middlewares/auth')
const errh = require('./middlewares/error_handler')
const app = express()

// Middlewares
app.use(bp.json())

// Routes
app.use(signup)
app.use(login)
app.use(redirect)
app.use('/api', auth)

app.use(errh)

const _port = process.env.PORT || 4000
app.listen(_port, () => console.info(`Application listening on port: ${_port}`))