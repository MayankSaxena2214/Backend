const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta',
    password:"Mayank@123",
  });

  // Query to insert into the user table only single entry
  // let q='INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)';
  // let user=["123","123_newuser","abc@gmail.com","abc"];

  //MULTIPLE ENTRIES INSERTION INTO THE USER TABLE USING MANUAL(WITHOUT FAKER)
//   let q='INSERT INTO user (id,username,email,password) VALUES ?';
//   let users=[["123b","123_newuserb","abc@gmail.comb","abcb"],
//   ["123c","123_newuserc","abc@gmail.comc","abcc"]];

//   //for multipl entry we use the below
//   try{
//     connection.query("SHOW TABLES",(err,result)=>{
//         if(err)throw err;
//         // resutl is a array
//         console.log(result.length);
//         console.log(result[0]);;
//         console.log(result[1]);
//     });
//     //For single entry insrtion in to the table user
//   //   connection.query(q,user,(err,result)=>{
//   //     if(err)throw err;
//   //     // resutl is a array
//   //     console.log(result);
//   // });
//   //For multiple user entry into the user table 
//   connection.query(q,[users],(err,result)=>{
//     if(err)throw err;
//     // resutl is a array
//     console.log(result);
// });
// }
//     catch(err){
//         console.log(err);
//     }
//   connection.end();
// let createRandomUser=()=> {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// }
// let getRandomUser=()=>{
//   return{
//       id:faker.datatype.uuid(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password()
//   }
// }
//nOW WE WILL RETURN ARRAY FROM THE GETRANDOM TO INSERT 
let getRandomUser=()=>{
    return[
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ]
}
let q='INSERT INTO user (id,username,email,password) VALUES ?';
let data=[];
for(let i=1;i<=100;i++){//generating 100 random user
  data.push(getRandomUser());
}
try{
    connection.query("SHOW TABLES",(err,result)=>{
        if(err)throw err;
        // resutl is a array
        console.log(result.length);
        console.log(result[0]);;
        console.log(result[1]);
    });
 
    connection.query(q,[data],(err,result)=>{
        if(err)throw err;
       // resutl is a array
        console.log(result);
    });
}
catch(err){
    console.log(err);
}
connection.end();

// console.log(createRandomUser());
// console.log(getRandomUser());