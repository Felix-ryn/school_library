const express = require("express")
const app = express()
const PORT = 8000
const cors = require(`cors`)
app.use(cors())
const memberRoute = require(`./routes/member.route`)
const adminRoute = require(`./routes/admin.route`)
const bookRoute = require(`./routes/book.route`)
const borrowRoute = require(`./routes/borrow.route`)
app.use(`/borrow`, borrowRoute)
app.use("/member", memberRoute)
app.use("/admin", adminRoute)
app.use("/book", bookRoute)
app.use(express.static(__dirname))
app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port
    ${PORT}`)
    })
