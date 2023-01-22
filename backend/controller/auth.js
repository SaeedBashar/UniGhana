const users = require('../model/users');

console.log(users)
module.exports.login = (req, res, next)=>{
    console.log(req.body)
    const isValid = authLogin(req.body);

    if(isValid) 
        res.json({status: isValid, msg: "Authentication Successfully!!", data: req.body})
    else
        res.json({status: isValid, msg: "Authenticatin Failed!!"});
}

module.exports.register = (req, res, next)=>{
    console.log(req.body)
    const retData = authRegister(req.body)
    res.json(retData)
}

const authLogin = (obj)=>{
    
    for(let u of users){
        if(u.email === obj.email && u.password === encryptPassword(obj.password)) return true;
    }

    return false;
}

const authRegister = (obj)=>{
   
    for(let u of users){
        if(u.email === obj.email){
            return {status: false, msg: "Email Can Not Be Used"}
        }
    }
    obj.password = encryptPassword(obj.password);
    users.push(obj)
    console.log(users)
    return {status: true, msg: "Registration Was Successful!!", data: obj}
}

const encryptPassword = (el)=>{
    let arg = el.split("");
    let temp = arg[arg.length - 1];
    arg[arg.length - 1] = arg[0];
    arg[0] = temp;

    return arg.join("");
}