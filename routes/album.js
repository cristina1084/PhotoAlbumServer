  
var exp = require('express');
const router = exp.Router();   
var body = require('body-parser');

router.use(body.urlencoded({ extended: false }));
router.use(body.json());

var album = require('../models/albummodel');

router.post('/addalbum', (req,res)=>{
    var a1 = new album(req.body);
    a1.save(err => {
        if (err) throw err;
        else res.send({msg: "Album created"});
    })
})
  
router.get('/getalbum/:uid', (req,res)=>{
    album.find({user:req.params.uid},(err,result)=>{
        if (err) throw err;
        else res.send(result);
    })
})
  
router.post('/editalbum',(req,res)=>{
    album.updateOne({name: req.body.oldname}, 
      {$set:
        {
          name: req.body.newname,
          description: req.body.description
        }
      }, (err,result)=>{
        if (err) throw err;
        else res.send({msg: "Updated"});
      })
})

router.get("/deletealbum/:albumname", (req,res)=>{
    album.deleteOne({name: req.params.albumname}, err=>{
      if (err) throw err;
      else res.send({msg:"Deleted"});
    })
})

module.exports=router;