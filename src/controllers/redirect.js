const router = require('express').Router()
const {Direction} = require('../utils/db')
const {check} = require('express-validator')
const rejectInvalid = require('../middlewares/reject_invalid')
const _p = require('../utils/promise_errors')

const entryValidator = [check('url').isURL()]
const _path = '/api/v1/redirects'

router.post(_path, entryValidator, rejectInvalid, async (req, res, next) => {
    let user_id = req.user.id
    let destination = req.body.url
    let timestamp = Date.now()/1000

    let hash = parseInt(`${user_id}${timestamp}`).toString(32)
    let [cretErr, created] = await _p(Direction.create({user_id, destination, hash}))
    if( cretErr && !created ){
        next(cretErr)
    }
    else{
        res.json({
            message: "Direction created Successfully",
            hash
        })
    }
})

router.get(_path, async (req, res, next) => {
    let [derr, myDirections] = await _p(Direction.findAll({
        where: {
            user_id: req.user.id
        }
    }))

    return derr ? next(derr) : res.json(myDirections.map(d => ({hash: d.hash, destination: d.destination, id: d.id, created_at: d.createdAt})))
})

router.get('/:hash', async(req, res, next) => {
    let [error, direction] = await _p(Direction.findAll({
        where: {
            hash: req.param('hash')
        }
    }))
    if(error) return next(error)
    if(direction){
        console.log(direction.dataValues.direction)
        res.redirect(301, direction.dataValues.direction)
    }
    else next()
})

module.exports = router