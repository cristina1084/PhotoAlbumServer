var express = require('express');
var body = require('body-parser');
var mongo = require('mongoose');
var multer = require('multer'); 
var path = require('path');

var app = express();
var url = "mongodb://localhost/gallerydb"

var signuprouter = require('./routes/signup');
var loginrouter = require('./routes/login');

var picture = require('./models/picturemodel');
var album = require('./models/albummodel');

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

mongo.connect(url,{useNewUrlParser:true}, (err)=>{
  if(err) throw err;
  else console.log("Database connected");
})

app.use(body.urlencoded({ extended: false }));
app.use(body.json());

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  
var upload = multer({ storage : storage});

app.use("/signup", signuprouter);

app.use("/login", loginrouter);
 
app.post('/api', upload.any(), (req, res)=>{
  console.log(req.files[0]);
  var p1 = new picture(req.files[0]);
  p1.save(err=>{
      if (err) throw err;
      else res.end('File is uploaded');
  })
})

app.post('/addalbum', (req,res)=>{
  var a1 = new album(req.body);
  a1.save(err => {
    if (err) throw err;
    else res.send({msg: "Album created"});
  })
})

app.get('/getalbum', (req,res)=>{
  album.find({},(err,result)=>{
    if (err) throw err;
    else res.send(result);
  })
})

app.get("/view/:img", (req,res)=>{        //image controller
  res.sendFile(path.join(__dirname+"/public/images/"+req.params.img));
})

app.get("/getpictures", (req,res)=>{
  picture.find({},(err,result)=>{
    if (err) throw err;
    else res.send(result);
  })
})

app.get("/deletepicture/:picname", (req,res)=>{
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

app.listen(process.env.PORT || 8080,()=>{
  console.log("Listening");
})

