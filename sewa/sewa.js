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

app.get ("/penyewa", (req,res) =>{
    let sql = "select *from penyewa"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                penyewa : result
            }
        }
        res.json(response)
    })
})

app.get("/penyewa/:id",(req,res) =>{
    let data = {
        id_penyewa: req.params.id
    }
    let sql = "select * from penyewa where ? "

    db.query(sql,data,(error,result) =>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else {
            response = {
                count: result.length,
                penyewa: result
            }
        }
        res.json(response)
    })
})

app.post("/penyewa",(req,res) =>{
    let data = {
        nama_penyewa : req.body.nama_penyewa,
        alamat : req.body.alamat
    }

    let sql = "insert into penyewa set ? "

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

app.put("/penyewa",(req,res) => {
    let data = [
        {

            nama: req.body.nama,
            alamat: req.body.alamat
        },
        {
            id_penyewa : req.body.id_penyewa
        }
    ]

    let sql = "update penyewa set ? where ?"

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

app.delete("/penyewa/:id", (req,res) => {

    let data ={
        id_penyewa:req.params.id
    }

    let sql = "delete from penyewa where ?"

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