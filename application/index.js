const express=require('express');
const app=express();
const port=8000;
var router=express.Router();
// var path=require('path');
var fs=require('fs');
app.listen(port,()=>{console.log("we are listened on "+port);});
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

function getDirectory(req,res,next){
    fs.readdir('./images',(err,files)=>{
        if (err){
            console.log(err.message);
        }
        else{

            var arrayname=[];
            length_names=files.length-1;
            for(var i=0;i<length_names;i++){
                arrayname.push(files[i]);
            }
            res.locals.image_names=arrayname;

            next();

        }
    });
}
// app.get('/',)
app.get('/images',getDirectory,function (req,res) {
    res.set('Content-Type', 'application/json');
    res.send(res.locals.image_names);
});
app.get('/array',(req,res)=>{
    var x=[1,2,3];
    res.send(x);
});
// app.get()
// app.get('images',(req,res)=>{
//
// });

/*var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var imagePath = path.join(path.resolve(__dirname, '..'), '/public/images/');

function getDirectoryContent(req, res, next) {
    fs.readdir(imagePath , function (err, images) {
        if (err) { return next(err); }
        res.locals.filenames = images;
        next();
    });
}

router.get('/', getDirectoryContent, function(req, res) {
    // build a response using res.locals.filenames here.
    // just sending the names is silly, and so for demonstration only
    res.send(res.locals.filenames);
});*/