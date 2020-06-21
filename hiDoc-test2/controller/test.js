// // const obj = {
// //     middleware1:(req,res,next)=>{
// //         // next()
// //     },
// //     somefunc:(req,res)=>{
// //         res.send('hello world')
// //     }
// // }

// // module.exports = obj
// const express = require("express");
// const middleware1 = (req, res, next) => {
//   req.obj = 67;

//   next();
// };
// const result = (req, res, next) => {
//   console.log(req);
// };

// const app = express();
// app.use("/", middleware1, result);
// app.listen(5000);
