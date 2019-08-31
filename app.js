var express = require('express');
var body = require('body-parser');
var mongo = require('mongoose');
var multer = require('multer'); 

var app = express();
var url = "mongodb://localhost/sdb"

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  
var upload = multer({ storage : storage}).single('pimage');

mongo.connect(url,{useNewUrlParser:true}, (err)=>{
  if(err) throw err;
  else console.log("Database connected");
})


app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.post("/upload",upload,(req,res)=>{
  console.log(req.file.filename);
})

app.listen(process.env || 8080,()=>{
  console.log("Listening");
})
