const express = require('express');
const app = express();
app.post('/api/log',function (req,res) {
  console.log('suc')
  const options={
    sucLog:1
  }
  console.log(req)
  res.send(options)
})
app.get('/home',function (req,res) {
  res.send('hello');
  console.log('666')
})
app.listen(3000,function () {
  console.log('3000')
})
