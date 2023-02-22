const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const { json } = require("express")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host : "localhost",
    user :"root",
    password:"",
    database :"sewa_kendaraan"
})


db.connect(error => {
    if (error){
        console.log(error.message)
    }else{
        console.log("MYSQL Connected")
    }
})

app.get ("/kendaraan", (req,res) =>{
    let sql = "select *from kendaraan"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                kendaraan : result
            }
        }
        res.json(response)
    })
})

app.get("/kendaraan/:id",(req,res) =>{
    let data = {
        id_kendaraan: req.params.id
    }
    let sql = "select * from kendaraan where ? "

    db.query(sql,data,(error,result) =>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else {
            response = {
                count: result.length,
                kendaraan: result
            }
        }
        res.json(response)
    })
})

app.post("/kendaraan",(req,res) =>{
    


    let data = {
        nama : req.body.nama,
        nopol : req.body.nopol,
        warna : req.body.warna,

        
        kondisi_kendaraan : req.body.kondisi_kendaraan

    }

    let sql = "insert into kendaraan set ? "

    db.query(sql,data,(error,result)=> {
        let response = null
        if (error){
            response ={
                message:error.message
            }
        }else{
            response ={
                message:result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })

})

app.put("/kendaraan",(req,res) => {
    let data = [
        {

            nama: req.body.nama,
            alamat: req.body.alamat
        },
        {
            id_kendaraan : req.body.id_kendaraan
        }
    ]

    let sql = "update kendaraan set ? where ?"

    db.query(sql,data,(error,result) => {
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response = {
                message:result.affectedRows + "data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/kendaraan/:id", (req,res) => {

    let data ={
        id_kendaraan:req.params.id
    }

    let sql = "delete from kendaraan where ?"

    db.query(sql, data, (error,result) => {
        let response = null
        if(error){
            response ={
                message: error.message
            }
        }else{
            response = {
                message:result.affectedRows + "data delected"
            }
        }
        res.json(response)
    })
})


app.listen(8000, ()=> {
    console.log("Run on port 8000")
})