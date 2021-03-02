//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "";
const aboutContent = "Vikas kumar B.tech CSE IV year student";
const contactContent = "Eamil: vy24754@gmail.com ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB",{  useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
  };
 
const Post = mongoose.model("Post",postSchema);


 
 



app.get("/", function(req, res){
  Post.find({}, function(err,posts){
    if(!err){
      console.log("successful");
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    }
  })
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post =new Post( {
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = req.params.postName;
  console.log(requestedTitle);
  
  Post.findOne({_id: requestedTitle}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
  

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});



//mongodb://localhost:27017/todolistDB
//mongodb+srv://admin-vikas:test123@cluster0.uj8sv.mongodb.net/todolist?retryWrites=true&w=majority
//useNewUrlParser: true