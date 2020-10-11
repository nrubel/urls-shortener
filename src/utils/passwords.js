const crypto = require('crypto')

const getRandomSalt = () => crypto.randomBytes(8).toString('hex').slice(0,16) 

const mix = (password, salt) => crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

const generate = password => {
    let salt = getRandomSalt()
    let hash = mix(password, salt)
    return {salt, hash}
}

const validate = (password, hash, salt) => {
    let newHash = mix(password, salt)
    return newHash === hash
}

module.exports = {validate, generate}