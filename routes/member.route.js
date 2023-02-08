const express = require("express")
const app = express()
app.use(express.json())
const memberController = require("../controller/member.controller")

app.get("/", memberController.getAllMember)
app.post("/", memberController.addMember)
module.exports = app