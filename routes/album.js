var exp = require('express');
const router = exp.Router();   

var album = require('../models/albummodel');
var picture = require('../models/picturemodel');

router.post('/addalbum', (req,res) => {
  var a1 = new album(req.body);
  a1.save(err => {
      if (err) throw err;
      else res.send({msg: "Album created"});
  })
})
  
router.get('/getalbum/:uid', (req,res) => {
  album.find({user:req.params.uid},(err,result) => {
      if (err) throw err;
      else res.send(result);
  })
})
  
router.post('/editalbum', (req,res) => {
  album.updateOne({user: req.body.user, name: req.body.oldname}, 
    {$set:
      {
        name: req.body.newname,
        description: req.body.description
      }
    }, err => {
      if (err) throw err;
      else res.send({msg: "Updated"});
    })
})

router.get("/deletealbum/:user/:albumname", (req,res) => {
  picture.deleteMany({user:req.params.user, albumName: req.params.albumname}, err => {
    if (err) throw err;
    else{
      album.deleteOne({user: req.params.user, name: req.params.albumname}, err => {
        if (err) throw err;
        else res.redirect("/album/getalbum/"+req.params.user);
      })
    }
  })
})

router.get("/deletealbums/:user", (req,res) => {
  picture.deleteMany({user:req.params.user}, err => {
    if (err) throw err;
    else{
      album.deleteMany({user: req.params.user}, err => {
        if (err) throw err;
        else res.redirect("/album/getalbum/"+req.params.user);
      })
    }
  })
})

module.exports=router;