const express=require("express");
const app=express();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
// to enable the express to understand the form data
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta',
    password:"Mayank@123",
});
let getRandomUser=()=>{
    return[
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ]
}
//For checking the connection has been established or not
// app.get("/",(req,res)=>{
//     console.log("Welcome to the home page");
//     res.send("Welcome to the home page");
// })

//1. creating the first route  get ("/") that will fetch the all user data
app.get("/",(req,res)=>{
    let q='SELECT COUNT(*) FROM user';  // in database we are having the 103 entries
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
           // resutl is a array
        //    console.log(result);   // output is :[ { 'COUNT(*)': 103 } ]  It returns the array into which object is present
           let count=result[0]["COUNT(*)"];
            res.render("home.ejs",{count});
        });
    }
    catch(err){
        console.log(err);
        res.send("Some error occured");
    }

});
//2 route for fetching all the data and printing in the table format
app.get("/users",(req,res)=>{
    let q="select * from user";
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
           // resutl is a array
        //    console.log(result);   // output is :[ { 'COUNT(*)': 103 } ]  It returns the array into which object is present
        //    let count=result[0]["COUNT(*)"];
        //     res.render("home.ejs",{count});
            res.render("users.ejs",{result});
        });
    }
    catch(err){
        console.log(err);
        res.send("Some error occured");
    }
  
});

//3 route for the editing  the username, IT WILL GIVE THE FORM TO USER TO ENTER THE DETAILS AND FINAL WILL BE DONE BY 4TH ROUTE
app.get("/users/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    //find user data corresponding to particular id
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            console.log(result);
            let user=result[0];
            //rendering the form 
            res.render("edit.ejs",{user});
        });
    }
    catch(err){
        console.log(err);
        res.send("Some error occured");
    }
});
//4th Get /user/:id  it wiill do the final updatoin in the database
app.patch("/users/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formPass,username:newUsername}=req.body;
    // console.log(id);
    //find user data corresponding to particular id
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            // console.log(result);
            let user=result[0];
            if(formPass!=user.password){
                res.send("Wrong Password");
            }
            else{
                //Now we have to write the query for the update 
                let q2=`UPDATE USER SET username='${newUsername}' where id='${id}'`;
                connection.query(q2,(err,result)=>{
                    if(err)throw err;
                    // res.send(result);
                    res.redirect("/users");
                })
            }
        });
    }
    catch(err){
        console.log(err);
        res.send("Some error occured");
    }
    
});
//5 delete route
app.get("/users/:id/delete",(req,res)=>{
    let{id}=req.params;
    console.log(id);
    //find user data corresponding to particular id
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            console.log(result);
            let user=result[0];
            //rendering the form 
            res.render("delete.ejs",{user});
        });
    }
    catch(err){
        console.log(err);
        res.send("Some error occured");
    }

});
app.delete("/users/:id",(req,res)=>{
    let {id}=req.params;
    let {email:newemail,password:newpass}=req.body;
    console.log(id);
    let q1=`select * from user where id='${id}'`;
    try{
        connection.query(q1,(err,result)=>{
            if(err)throw err;
            let user=result[0];
            if(user.email!=newemail || user.password!=newpass){
                res.send("Wrong data entered");
            }
            else{
                let q2=`Delete from user where id='${id}'`;
                connection.query(q2,(err,result)=>{
                    if(err)throw err;
                    res.redirect("/users");
                })
            }
        })
    }
    catch(err){
        res.send("Error occured");
    }
});
app.listen("8080",()=>{
    console.log("app is listening on port 8080");
});
