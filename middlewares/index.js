const express=require("express");
const app=express();
const ExoressError=require("./expresserror");
const ExpressError = require("./expresserror");
// app.use((req,res)=>{

//     console.log("Hi I am a middleware");
//     res.send("Middlewaer finished");
// });
// app.use((req,res,next)=>{
//     console.log("Hi I am a middleware1");
//     next(); //now middleware will gave the final request to the page we have sent
// });
// app.use((req,res,next)=>{

//     console.log("Hi I am a middleware 2");
//     next(); //now middleware will gave the final request to the page we have sent
// });
app.use("/random",(req,res,next)=>{
    // console.log(req);
    console.log(req.method);
    next(); //now middleware will gave the final request to the page we have sent
});
// middleware activity for /api request
const checktoken=(req,res,next)=>{
    let {token}=req.query;
    if(token==="giveaccess"){
        next();
    }
    // res.send("Access denied");
    //we can send the error of our own 
    // throw new Error("Access denied");
    throw new ExoressError(401,"Access Denied");
};

app.get("/api",checktoken,(req,res)=>{
    res.send("data");
});
app.get("/",(req,res)=>{
    res.send("i am a root");
})
app.get("/random",(req,res)=>{
    res.send("This is the random page");
});
app.get("/mayank",(req,res)=>{
    console.log(abcd);
})
app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"Access to admin is forbidden");
})
app.use((err,req,res,next)=>{
    console.log("Error middleware 1");
    let{status=500,message="Some default errror"}=err;
    res.status(status).send(message);
    // let{status,message}=err;
    
    // // res.send(err);
    // res.status(status).send(message);
})
// app.use((err,req,res,next)=>{
//     console.log("Error middleware 2");
//     next(err);// now the express error handling middleware will be called
// });

// app.use((req,res,next)=>{
//     res.send("Page not found");
// })
app.listen(8000,(req,res)=>{
    console.log("App is listening on port 8000");
});