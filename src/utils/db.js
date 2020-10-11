const Sequelize = require('sequelize')

const CONNECTION_STRING = process.env.DATABASE || 'postgres://postgres:secret@localhost:5432/urls'
const db = new Sequelize(CONNECTION_STRING)

const User = db.define('user', {
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT
})

const Direction = db.define('directionss', {
    destination: Sequelize.TEXT,
    hash: Sequelize.TEXT
})

module.exports = {
    db, User, Direction
}