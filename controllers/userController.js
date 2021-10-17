const bcrypt = require('bcrypt');
const { FailedDependency } = require('http-errors');
const jwt = require('jsonwebtoken');
const db = require('../util/db.util');
const salt = bcrypt.genSaltSync(10);
const auth = require('../auth');
const User = require('../models/users')



function createUser (req, res){
    var hash = bcrypt.hashSync(req.body.password, salt);
    User.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : hash
    },function(err, data){
        if(data){
            return res.status(200).json({message: "Account created, login!", data});
        }else {
            return res.status(200).json({message: "Error registering"}, err);
        }
    })
 
}

function login(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(!user){
            return res.json({
                status:false,                  
                message:"Email and password does not match"
            }) 
        }else{
            var comparePassword = bcrypt.compare(req.body.password, user.password)
            if(!comparePassword){
                return res.status(401).send({ auth: false, token: null });
            }
        }
        var token = jwt.sign({email: user.email}, auth.secret, {
            expiresIn: 86400
        })
        res.json({message: "Welcome", token: token})
    })
}


function logout (req, res) {
   return  res.json({message: "Goodbye"})
  }

module.exports = {createUser, login, logout};