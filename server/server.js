const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

let app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname,'../public/')));
// app.get('/',(req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/index.html'));
// })

app.listen(port, ()=>{
  console.log('started on port '+ port);
});
