const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const validator = require('validator');
const bank = require('./bankjson')
const fs = require('fs')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.status(200).json(JSON.parse((fs.readFileSync('users.json')).toString()))
})

app.post('/',(req ,res)=>{
res.status(202).json(bank.addNewUser(req.body))
})

app.put('/:passportId' ,(req ,res)=>{
  const {passportId} = req.params;
  const {cash} = req.body;

  let item = JSON.parse((fs.readFileSync('users.json')).toString())
  let updateitem = item.find(i => {
      return i.passportId === passportId
  })
  if(!updateitem){
      return res.status(400).json({err : 'item is not exist'})
  }
  updateitem.cash =parseInt(updateitem.cash) + parseInt(cash)
  //updateitem.credit = parseInt(credit)
  return res.status(200).json(bank.saveUseres(item))
})

app.put('/credit/:passportId' ,(req ,res)=>{
    const {passportId} = req.params;
    const {credit} = req.body;
  
    let item = JSON.parse((fs.readFileSync('users.json')).toString())
    let updateitem = item.find(i => {
        return i.passportId === passportId
    })
    if(!updateitem){
        return res.status(400).json({err : 'item is not exist'})
    }
   if(credit >= 0){
    updateitem.credit = parseInt(credit)
    return res.status(200).json(bank.saveUseres(item))
   }
   else{
       return res.status(401).json({err : "you are to poor"})
   }
  })
  

app.listen(5000 ,()=> console.log('app listening on port 5000!'))