const bodyParser = require("body-parser")
const express = require("express")
const cors = require ("cors")
const app = express()
const moment = require("moment")
const useroute = require("./user")
const siswaroute = require("./siswaa")
const pelaggaranroute = require("./pelanggaran")
const pelanggaran_siswaroute = require("./pelanggaran_siswa")

app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(pelanggaran_siswaroute)
app.use(pelaggaranroute)
app.use(useroute)
app.use(siswaroute)


app.listen(8000,()=>{
    console.log("run 8000")
})