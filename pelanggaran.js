const express = require("express")
const router = express.Router()
const db = require("./db")

router.get ("/pelanggaran", (req,res) =>{
    let sql = "select *from pelanggaran"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message : error.message
            }
        }else {
            response = {
                count : result.length,
                pelanggaran : result
            }
        }
        res.json(response)
    })
})




router.get("/pelanggaran/:id",(req,res) =>{
    let data = {
        id_pelanggaran: req.params.id
    }
    let sql = "select * from pelanggaran where ? "

    db.query(sql,data,(error,result) =>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else {
            response = {
                count: result.length,
                pelanggaran: result
            }
        }
        res.json(response)
    })
})



router.post("/pelanggaran",(req,res) =>{
    let data = {
        nama_pelanggaran : req.body.nama_pelanggaran,
        poin : req.body.poin
    }

    let sql = "insert into pelanggaran set ? "

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

router.put("/pelanggaran",(req,res) => {
    let data = [
        {
            nama_pelanggaran: req.body.nama_pelanggaran,
            poin: req.body.poin
        },
        {
            id_pelanggaran : req.body.id_pelanggaran
        }
    ]

    let sql = "update pelanggaran set ? where ?"

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


router.delete("/pelanggaran/:id", (req,res) => {

    let data ={
        id_pelanggaran:req.params.id
    }

    let sql = "delete from pelanggaran where ?"

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

module.exports = router