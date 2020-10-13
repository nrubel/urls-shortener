const {Sequelize} = require('sequelize')

const CONNECTION_STRING = process.env.DATABASE || 'postgres://postgres:secret@localhost:5432/urls'
const db = new Sequelize(CONNECTION_STRING)

const User = db.define('user', {
    name: Sequelize.TEXT,
    email: {
        type: Sequelize.TEXT,
        unique: true
    },
    password: Sequelize.TEXT
})

const Direction = db.define('directionss', {
    user_id: Sequelize.NUMERIC,
    destination: Sequelize.TEXT,
    hash: Sequelize.TEXT
})

db.sync()
    .then(e => console.log(`Database Synced`))
    .catch(e => console.error(e))

module.exports = {
    db, User, Direction
}