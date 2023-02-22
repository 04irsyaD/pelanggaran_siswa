const express =  require("express")
const router = express.Router()
const db = require("./db")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

router.get("/siswa", (req, res) => {
    let sql = "select * from siswa"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

router.get("/siswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    let sql = "select * from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

router.post("/siswa", upload.single("image"), (req, res) => {
    let data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas:req.body.kelas,
        poin: req.body.poin,
        image: req.file.filename
    }

    if (!req.file) {
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } else {
        let sql = "insert into siswa set ?"

        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message:result.affectedRows + " data berhasil disimpan"
            })
        })
    }
})

router.put("/siswa", upload.single("image"), (req,res) => {
    let data = null, sql = null

    let param = { id_siswa: req.body.id_siswa }

    if (!req.file) {
        data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas:req.body.kelas,
        poin: req.body.poin
        
        
        }
    } else {
        data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas:req.body.kelas,
        poin: req.body.poin,
        image: req.file.filename
        }

        sql = "select * from siswa where ?"
        db.query(sql, param, (err, result) => {
            if (err) throw err
            let fileName = result[0].image

            let dir = path.join(__dirname,"image",fileName)
            fs.unlink(dir, (error) => {})
        })
    }

    sql = "update siswa set ? where ?"

    db.query(sql, [data,param], (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil diubah"
            })
        }
    })
})

router.delete("/siswa/:id", (req,res) => {
    let data = {
        id_siswa: req.params.id
    }

    let sql = "delete from siswa where ?"

    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})

module.exports = router

