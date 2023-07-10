const express = require("express")
PORT = 3333
const DB = require("./config/DB")
const router = require("./routers/staffRouter")

const fileUploader=require("express-fileupload")

const app = express()
app.use(express.json())
app.use(fileUploader({useTempFiles:true}))
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})