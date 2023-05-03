const express = require('express')
const cors = require('cors')
const axios = require('axios')


const app = express()
const port = 3000

let url = 'https://echo-serv.tbxnet.com/v1/secret/files'
//#region
app.use(
    express.urlencoded({
        extended: true
    }))

app.use(
    express.json({
        type: "*/*"
    }))
app.use(cors());
//#endregion

let config = {
    headers:{
        Authorization: "Bearer aSuperSecretKey"
    }
}
// app.get('/prueba',(req,res)=>{
//     res.send('Hola estoy funcionando');
// })

// axios.get(url,config).then(response =>{
//     console.log(response.data)
// })

app.get('/test',(req,res)=>{
    axios.get(url,config).then(response =>{
        console.log(response.data)
    })
})


app.listen(port, ()=>{
    console.log(`Estoy ejecuntandome en http://localtosst:${port}`)
})