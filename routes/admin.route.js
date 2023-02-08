const express = require("express")
const app = express()
app.use(express.json())
const adminController = require("../controller/admin.controller")
app.get("/", adminController.getAllAdmin)
app.post("/add", adminController.addAdmin)
module.exports = app
