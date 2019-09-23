var exp = require('express');
const router = exp.Router();

var user = require('../models/usersmodel');

router.post("/", (req,res) => {
    user.find({username:req.body.username, password:req.body.password}, (err,result) => {
        if (err) throw err;
        else {
            if (result.length!=0) res.send({found:true})
            else res.send({found:false})
        }
    })
})

router.get("/getdetails/:uid", (req,res) => {
    user.find({username:req.params.uid}, (err, result) => {
        if (err) throw err;
        else res.send(result)
    })
})

router.post("/editdetails", (req, res) => {
    user.updateOne({username:req.body.username},
        {$set:{
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender
        }}, err => {
            if (err) throw err;
            else res.redirect("/login/getdetails/"+req.body.username);
        })
} )

module.exports = router;