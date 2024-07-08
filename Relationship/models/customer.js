//Implementing the one tomany in mongo (approach 2 for one to  many)
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
const orderSchema=new Schema({
    item:String,
    price:Number,
});
const Order=mongoose.model("Order",orderSchema);//model is created

const customerSchema=new Schema({
    name:String,
    orders:[
        {
            //we will not store the orders details in it  because details are alerady in the orders collection so 
            //we will only store the order id and then we can fetch the details using these id
            type:Schema.Types.ObjectId,
            ref:"Order",
        }
    ]
});
// customerSchema.pre("findOneAndDelete",async()=>{
//     console.log("Pre Middleware");
// })
customerSchema.post("findOneAndDelete",async(data)=>{
    if(data.orders.length){
        let result=await Order.deleteMany({_id:{$in:data.orders}});
        console.log(result);
    }
})
const Customer=mongoose.model("Customer",customerSchema);//model is created
// const addCustomer=async()=>{
//     let cust1=new Customer({
//         name:"Mayank",
//     });
//     let order1=await Order.findOne({item:"Samosa"});
//     let order2=await Order.findOne({item:"PavBhaji"});
//     cust1.orders.push(order1);
//     cust1.orders.push(order2);
//     // cust1.orders.push(order1);
//     // let result=await cust1.save();
//     // console.log(result);
//     let result=await cust1.save();
//     console.log(result);
// }
// addCustomer();
// const addOrder=async()=>{
//     let result=await Order.insertMany([{item:"Samosa",price:10},
//     {item:"PavBhaji",price:20},
//     {item:"Paratha",price:30}]);
//     console.log(result);
// }
// addOrder();

// const getData=async()=>{
//     let result=await Customer.find({});
//     console.log(result);
// }
// getData(); it will return below data format
// [
//     {
//       _id: new ObjectId('65eafa2ed6a39ef48c50a718'),     
//       name: 'Mayank',
//       orders: [
//         new ObjectId('65eaf7b702cb29959a729b2e'),        
//         new ObjectId('65eaf7b702cb29959a729b2f')
//       ],
//       __v: 0
//     }
//   ]
// If we wnt the order details complete then we use teh populate method
const getData=async()=>{
    let result=await Customer.find({}).populate("orders");  //it will return the order details complete in the customer collection
    console.log(result[0]);
}
// getData();
const addCust=async()=>{
    let newCust=new Customer({
        name:"Karan"
    });
    let newOrder=new Order({
        item:"Burger",
        price:100
    });
    newCust.orders.push(newOrder);
    await newCust.save();
    await newOrder.save();
    console.log("Added new customer");

}
// addCust();
const delCust=async()=>{
    let result=await Customer.findByIdAndDelete('65eafa2ed6a39ef48c50a718');
}   
delCust();