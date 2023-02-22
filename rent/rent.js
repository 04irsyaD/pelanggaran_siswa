const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const multer = require("multer") // untuk upload file
const path = require("path") // untuk memanggil path direktori
const fs = require("fs") // untuk manajemen file
const mysql = require("mysql")
const { json } = require("express")
const md5 = require("md5")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host : "localhost",
    user :"root",
    password:"",
    database :"rent_car"
})

db.connect(error => {
    if (error){
        console.log(error.message)
    }else{
        console.log("MYSQL Connected")
    }
})


app.get ("/mobil", (req,res) =>{
    let sql = "select *from mobil"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                mobil : result
            }
        }
        res.json(response)
    })
})




app.get("/mobil/:id",(req,res) =>{
    let data = {
        id_mobil: req.params.id
    }
    let sql = "select * from mobil where ? "

    db.query(sql,data,(error,result) =>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else {
            response = {
                count: result.length,
                mobil: result
            }
        }
        res.json(response)
    })
})



app.post("/mobil",(req,res) =>{
    let data = {
        nomor_mobil : req.body.nomor_mobil,
        merk : req.body.nama_merk,
        jenis : req.body.jenis,
        warna : req.body.warna,
        tahun_pembuatan : req.body.tahun_pembuatan,
        biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
        image : req.file.filename
    }

    let sql = "insert into mobil set ? "

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

app.put("/mobil",(req,res) => {
    let data = [
        {
            nomor_mobil : req.body.nomor_mobil,
        merk : req.body.nama_merk,
        jenis : req.body.jenis,
        warna : req.body.warna,
        tahun_pembuatan : req.body.tahun_pembuatan,
        biaya_sewa_per_hari : req.body.biaya_sewa_per_hari,
        image : req.body.image
        },
        {
            id_mobil : req.body.id_mobil
        }
    ]

    let sql = "update mobil set ? where ?"

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


app.delete("/mobil/:id", (req,res) => {

    let data ={
        id_mobil:req.params.id
    }

    let sql = "delete from mobil where ?"

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

//--------------------------------------------------------------------------------------\\\\

app.get ("/karyawan", (req,res) =>{
    let sql = "select *from karyawan"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                karyawan : result
            }
        }
        res.json(response)
    })
})




app.get("/karyawan/:id",(req,res) =>{
    let data = {
        id_karyawan: req.params.id
    }
    let sql = "select * from karyawan where ? "

    db.query(sql,data,(error,result) =>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else {
            response = {
                count: result.length,
                karyawan: result
            }
        }
        res.json(response)
    })
})



app.post("/karyawan",(req,res) =>{
    let data = {
        nama_karyawan : req.body.nama_karyawan,
        alamat_karyawan :req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username : req.body.username,
        password : md5(req.body.password)
    }

    let sql = "insert into karyawan set ? "

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

app.put("/karyawan",(req,res) => {
    let data = [
        {
            nama_karyawan : req.body.nama_karyawan,
            alamat_karyawan :req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username : req.body.username,
            password : md5(req.body.password)
        },
        {
            id_karyawan : req.body.id_karyawan
        }
    ]

    let sql = "update karyawan set ? where ?"

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


app.delete("/karyawan/:id", (req,res) => {

    let data ={
        id_karyawan:req.params.id
    }

    let sql = "delete from karyawan where ?"

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
//----------------------------------------------------------------------------------\\\\\\\\

app.get ("/pelanggan", (req,res) =>{
    let sql = "select *from pelanggan"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                pelanggan : result
            }
        }
        res.json(response)
    })
})




app.get("/pelanggan/:id",(req,res) =>{
    let data = {
        id_pelanggan: req.params.id
    }
    let sql = "select * from pelanggan where ? "

    db.query(sql,data,(error,result) =>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else {
            response = {
                count: result.length,
                pelanggan: result
            }
        }
        res.json(response)
    })
})



app.post("/pelanggan",(req,res) =>{
    let data = {
        nama_pelanggan : req.body.nama_pelanggan,
        alamat_pelanggan :req.body.alamat_pelanggan,
        kontak : req.body.kontak
    }

    let sql = "insert into pelanggan set ? "

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

app.put("/pelanggan",(req,res) => {
    let data = [
        {
            nama_pelanggan : req.body.nama_pelanggan,
            alamat_pelanggan :req.body.alamat_pelanggan,
            kontak : req.body.kontak
        },
        {
            id_pelanggan : req.body.id_pelanggan
        }
    ]

    let sql = "update pelanggan set ? where ?"

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


app.delete("/pelanggan/:id", (req,res) => {

    let data ={
        id_pelanggan:req.params.id
    }

    let sql = "delete from pelanggan where ?"

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

//------------------------------------------

app.listen(8000, ()=> {
    console.log("Run on port 8000")
})