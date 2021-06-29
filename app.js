const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const lodash = require("lodash");
const truncate = require("truncate-html");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs")

const hometext="Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const abouttext="Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contacttext="Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//const title=[];
const text=[];
const par=[];
app.listen(process.env.PORT || 3000,function(){
    console.log("Server connected")
});


app.get("/",function(req,res){
//    res.render("index",{home:hometext,about:abouttext,contact:contacttext,newtitle:title,newtext:text});
    
 
    res.render("index",{home:hometext,about:truncate(abouttext,100),contact:truncate(contacttext,100),
                        newtext:par});
});


app.get("/about",function(req,res){
    res.render("about",{about:abouttext});
});


app.get("/contact",function(req,res){
    res.render("contact",{contact:contacttext});
});


app.get("/compose",function(req,res){
    res.render("compose");
});


app.get("/:blog",function(req,res){
    text.forEach(function(element){
        const title=lodash.lowerCase(element.title);
        const blog=lodash.lowerCase(req.params.blog);
        if(title==blog){
            res.render("post",{heading:element.title,post:element.blog})
        }

    })
    
})


app.post("/",function(req,res){
//    title.push(req.body.title);
//    text.push(req.body.blog);
    const post={
        title:req.body.title,
        blog:req.body.blog
    };
    const post2={
        title:req.body.title,
        blog:truncate(req.body.blog,100)
    };
    text.push(post)
    par.push(post2)
    res.redirect("/")
})