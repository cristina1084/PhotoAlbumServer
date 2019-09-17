  
var exp = require('express');
const router = exp.Router();   
var body = require('body-parser');
var multer = require('multer'); 

router.use(body.urlencoded({ extended: false }));
router.use(body.json());

var picture = require('../models/picturemodel');

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  
var upload = multer({ storage : storage});

router.post('/api/:id1/:id2', upload.any(), (req,res)=>{
    req.files[0]['user'] = req.params.id1;
    req.files[0]['albumName'] = req.params.id2;
    console.log(req.files[0]);
    var p1 = new picture(req.files[0]);
    p1.save(err=>{
      if (err) throw err;
      else res.end('File is uploaded');
    })
})
  
router.get("/getpictures/:albumname", (req,res)=>{
    picture.find({albumName: req.params.albumname},(err,result)=>{
      if (err) throw err;
      else res.send(result);
    })
  })
  
router.get("/deletepicture/:picname", (req,res)=>{
    picture.deleteOne({filename: req.params.picname}, err=>{
      if (err) throw err;
      else{
        picture.find({},(err,result)=>{
          if(err) throw err;
          else res.send(result);
      })
      }
    })
})

module.exports=router;