var exp = require('express');
const router = exp.Router();   
var multer = require('multer'); 

var picture = require('../models/picturemodel');

var storage =   multer.diskStorage({  
  destination: (req, file, callback) => {  
    callback(null, './public/images');  
  },  
  filename: (req, file, callback) => {  
    callback(null, file.originalname);  
  }  
});  
  
var upload = multer({ storage : storage});

router.post('/api/:id1/:id2', upload.any(), (req,res) => {
  req.files[0]['user'] = req.params.id1;
  req.files[0]['albumName'] = req.params.id2;
  // console.log(req.files[0]);
  var p1 = new picture(req.files[0]);
  p1.save(err => {
    if (err) throw err;
    else res.end('File is uploaded');
  })
})
  
router.get("/getpictures/:user/:albumname", (req,res) => {
  picture.find({user:req.params.user, albumName: req.params.albumname}, (err,result) => {
    if (err) throw err;
    else res.send(result);
  })
})
  
router.get("/deletepicture/:user/:albumname/:picname", (req,res) => {
  picture.deleteOne({user:req.params.user, albumName: req.params.albumname, filename: req.params.picname}, err => {
    if (err) throw err;
    else res.redirect("/picture/getpictures/"+req.params.user+"/"+req.params.albumname);
  })
})

router.get("/deletepictures/:user/:albumname", (req,res) => {
  picture.deleteMany({user:req.params.user, albumName: req.params.albumname}, err => {
    if (err) throw err;
    else res.redirect("/picture/getpictures/"+req.params.user+"/"+req.params.albumname);
  })
})

module.exports=router;