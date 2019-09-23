var express = require('express');
var body = require('body-parser');
var mongo = require('mongoose');
var path = require('path');

var app = express();
var url = "mongodb+srv://cristina1084:Cristina1084@cluster0-qjdmb.mongodb.net/gallery?retryWrites=true&w=majority"

var signuprouter = require('./routes/signup');
var loginrouter = require('./routes/login');
var albumrouter = require('./routes/album');
var picturerouter = require('./routes/picture');

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'https://snapshots-site.herokuapp.com/');
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

app.use("/signup", signuprouter);

app.use("/login", loginrouter);

app.use("/album", albumrouter);

app.use("/picture", picturerouter);


app.get("/view/:img", (req,res)=>{        //image controller
  res.sendFile(path.join(__dirname+"/public/images/"+req.params.img));
})


app.listen(process.env.PORT || 8080,()=>{
  console.log("Listening");
})

