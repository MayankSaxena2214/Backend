//Implementign the one to few in mongo
const mongoose=require("mongoose");
const {Schema}=mongoose;
//sample code from the mongoose docmentation
main()
.then(()=>{
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relation');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema=new Schema({
    username:String,
    addresses:[
        {
            _id: false,
            location:String,
            city:String,
        },
    ],
});
const User=mongoose.model("User",userSchema);//model is created
const addUsers=async()=>{
    let user1=new User({
        username:"Mayank",
        addresses:[{
            
            location:"Malar street",
            city:"Pune"
        }]
    });
    user1.addresses.push({
        location:"Jalalabad street",
        city:"Pune"
    });
    let result=await user1.save();
    console.log(result);
}
addUsers();