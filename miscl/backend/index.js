const express=require("express");
const app=express();
let port=8000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port,()=>{
    console.log(`Listening on the port${port}`);
});
app.get("/register",(req,res)=>{
    res.send("Standard GET response");
})
app.post("/register",(req,res)=>{
    console.log(req.body);
    let {user,pass}=req.body;
    res.send(`Username id${user} and Password is ${pass}`);
})