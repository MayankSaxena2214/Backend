const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
//for method override
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
const Chat=require("./models/chat.js");
app.use(express.static(path.join(__dirname,"public")));
//to enable the express to understand the form data
app.use(express.urlencoded({extended:true}));
main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
//instead of creating the model in the index.js we have created a folder named models in which
//we write different models and then we finally require them in the index.js
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();  //All the chats will be fetched in this because we have not write any condition
    //we have used the await because Chat.find() is a asynchronous function but await can be used in the asynchronous function so we use async functi0n
    // console.log(chats);
    res.render("chats.ejs",{chats});
}) 
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
app.post("/chats",(req,res)=>{
    // let {from:sender,to:receiver,msg:message}=req.params;
    let {from,msg,to}=req.body;
    let newchat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    });
    newchat.save()
    .then((res)=>{
        console.log("Chat was saved");
    })
    .catch((err)=>{
        console.log("Some error occured");
    })
    res.redirect("/chats");
})
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    // console.log(newmsg);
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    // console.log(updatedchat);
    res.redirect("/chats");
});
//destroy route
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let chattodel=await Chat.findByIdAndDelete(id);
    console.log(chattodel);
    res.redirect("/chats");
})
app.get("/",(req,res)=>{
    res.send("Root route");
})
app.listen(8080,()=>{
    console.log("App is listening on port 8080");
});
