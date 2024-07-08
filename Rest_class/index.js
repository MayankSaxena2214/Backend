const express=require("express");
const app=express();
let port=8080;


var methodOverride = require('method-override')

 
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))


const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//Requiring path for public and views forlder
let path=require("path");
//Middleware to enable the server to understand the api using form
//parsing
app.use(express.urlencoded({extended:true}));//Now our express will understand the data which we send using the front end
//Now setting the path
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"Shraddha Khapra",
        content:"Hardwork is necessary for the success"
    },
    {
        id:uuidv4(),
        username:"rahulKumar",
        content:"I got selected for my first internship"
    }
]
//Sending the basic request for checking functioning
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
//    res.send("Post request received");
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    // console.log(post);
    // res.send("Request working");
    res.render("show.ejs",{post});
});
// app.patch("/posts/:id",(req,res)=>{
//     let {id}=req.params;
//     let newcontent=req.body.content;
//     console.log(newcontent);
//     console.log(id);
//     res.send("patch request working");
// })
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content; // Extract content from the request body
    console.log(newcontent); // This should now print the new content
    console.log(id);
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`App is listening on the port ${port}`);
});
