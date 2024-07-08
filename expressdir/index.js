const express = require('express')
const app = express()
// console.dir(app);
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
let port=3000;
app.listen(port,()=>{
    console.log(`App is listenng on the port ${port}`);
})
// app.use((req,res)=>{    //app.use responds to each type of request i.e /home /apple /downloads  it gave same response for every
//     console.log("New incoming request received");// but to use the specific response we can use the app.get
//     // res.send("This is a basic response");
//     res.send("<h1>Request received</h1><ul><li>Apple</li><li>Mango</li>");
// })

app.get("/",(req,res)=>{
    res.send("Helld");
})
app.get("/apple",(req,res)=>{
    res.send("You contactd apple path");
})
app.get("/mango",(req,res)=>{
    res.send("You contactd mango path");
})
app.get("*",(req,res)=>{
    res.send("You contactd wrong path");
})
app.post("/",(req,res)=>{
    res.send("You contactd post request path");
})