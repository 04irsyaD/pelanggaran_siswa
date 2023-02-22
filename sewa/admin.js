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

app.get ("/admin", (req,res) =>{
    let sql = "select *from admin"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                admin : result
            }
        }
        res.json(response)
    })
})

app.get("/admin/:id",(req,res) =>{
    let data = {
        id_admin: req.params.id
    }
    let sql = "select * from admin where ? "

    db.query(sql,data,(error,result) =>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else {
            response = {
                count: result.length,
                admin: result
            }
        }
        res.json(response)
    })
})

app.post("/admin",(req,res) =>{
    let data = {
        nama_admin : req.body.nama_admin,
        status_admin : req.body.status_admin
    }

    let sql = "insert into admin set ? "

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

app.put("/admin",(req,res) => {
    let data = [
        {

            nama_admin: req.body.nama_admin,
            status_admin: req.body.status_admin
        },
        {
            id_admin : req.body.id_admin
        }
    ]

    let sql = "update admin set ? where ?"

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

app.delete("/admin/:id", (req,res) => {

    let data ={
        id_admin:req.params.id
    }

    let sql = "delete from admin where ?"

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


app.listen(800, ()=> {
    console.log("Run on port 8000")
})