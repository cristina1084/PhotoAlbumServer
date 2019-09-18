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

module.exports = router;