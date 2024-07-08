const express=require("express");
const app=express();
let port=8000;
const path=require("path");

// for serving the static fles
// app.use(express.static("public"));
//for handling the path 
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.get("/",(req,res)=>{
    console.log("Request received");
    res.render("home.ejs");
})
app.get("/hello",(req,res)=>{
    console.log("Request received");
    res.send("Hello received");
})
app.get("/rolldice",(req,res)=>{
    let num=Math.floor(Math.random()*6)+1;
    res.render("dice.ejs",{diceval:num});
})
app.get("/ig/:username",(req,res)=>{
    const instadata=require("./data.json");
    let {username}=req.params;
    // console.log(instadata);?
    const data=instadata[username];
    if(data){
        res.render("insta.ejs",{data});
    }
    else{
        res.render("error.ejs");
    }
    // console.log(data);
    
})
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});