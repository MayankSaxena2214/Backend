let express=require("express");
let app=express();
let port=8000;
app.listen(port,(req,res)=>{
    console.log(`App is listening on the port${port}`);
})
app.get("/",(req,res)=>{
    console.log("Request recieved");
    res.send("You contacted the root path");
})
// Now we will use variable to store the route
// app.get("/:username",(req,res)=>{
//     console.log(req.params);
//     res.send("This request received using the variable");
// })
app.get("/:username/:id",(req,res)=>{
    console.log(req.params);
    let {username,id}=req.params;
    // res.send("This request received using two variable");
    res.send(`Welcome ${username} to the page your id is ${id}`);
})

//Now we will use the query string in sending request and giving the response
app.get("/search",(req,res)=>{
    // console.log(req.query);
    let {q}=req.query;
    res.send(`you searched ${q}`);
})