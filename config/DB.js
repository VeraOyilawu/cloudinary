const mongoose = require("mongoose")
const dotenv = require("dotenv")

mongoose.connect(process.env.url)
.then(()=> {
    console.log("connection sucessfully........");
})
.catch( () => {
    console.log("unable to connect........");
})  