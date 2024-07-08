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
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}
const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        },
        price:{
            type:Number
        ,}
});
const Book=mongoose.model("Book",bookSchema);
// let book1=new Book({
//     title:"Mathematics",
//     author:"RD sharma",
//     price:1000
// });
let book2=new Book({
    
    author:"sharma",
    price:1005
});
book2.save()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})