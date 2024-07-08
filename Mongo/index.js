const mongoose = require('mongoose');
// connection establishing 
main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
// Schema creating
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});
//model creating
const User=mongoose.model("User",userSchema);
const Employee=mongoose.model("Employee",userSchema);

//INSERT IN MONGOOSE
//1 INSERTING ONE VALUE AT ONCE
// const user1=new User({name:"Adam",email:"da@gmail.com",age:48});
// const user2=new User({name:"Bob",email:"bob@gmail.com",age:48});
// user1.save();
// user2.save();
// const user3=new User({name:"Bb",email:"bob@gmail.com",age:48});
// user3.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

//2INSERTING MULTIPLE VALUES
// User.insertMany([
//     {name:"Tony2",email:"tony@gmail.com",age:50},
//     {name:"burce2",email:"burce@gmail.com",age:50},
//     {name:"peter2",email:"peter@gmail.com",age:50},
// ]).then((data)=>{
//     console.log(data);
// })

//find method
// User.find({})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

// User.findOne({age:{$gt:48}})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

// User.findById('65e34c90abb136aca5c3bee5')
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

//updateone
// User.updateOne({name:"peter2"},{age:100})
// .then((res)=>{
//     console.log(res);
// });
// User.findByIdAndUpdate('65e34c90abb136aca5c3bee6',{age:40},{new:true})//peter2 id
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

//delete
User.deleteOne({email:"peter@gmail.com"})
.then((res)=>{
    console.log(res);
});