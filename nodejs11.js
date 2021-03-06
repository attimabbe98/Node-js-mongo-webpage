var express=require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.get('/',function(request,response){
    //response.send('<html><body><h1>Welcome to Express</h1></body></html>');
    response.sendFile(__dirname+'/book.html');
});

var mongoose = require("mongoose");
const { userInfo } = require('os');
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    author: String,
    title: String
   });

   var User = mongoose.model("User", nameSchema);
 

   app.post("/book", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });


   app.get('/getAll',(req,res,next)=>{
       User.find()
       .then(result=>
        {
            res.status(200).json({
                userData:result
            });
            })
            .catch(err=>
                {
                    console.log(err);
                    res.status(500).json({
                        error:err
                
                })
        });
   });
    
 
app.listen(8123,function(){
console.log('Node server is running');
});