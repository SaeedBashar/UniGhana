const users = require('../model/users');

console.log(users)
module.exports.login = (req, res, next)=>{
    console.log(req.body)

    res.json({status: true, data: {...req.body}})
}

module.exports.register = (req, res, next)=>{
    console.log(req.body)

    res.json({status: true, data: {...req.body}})
}