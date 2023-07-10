const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    qualification: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    profile: {
        public_id:{type:String},
        url:{type:String}
    }
}, {timestamps: true})

const staffModel = mongoose.model("staffDetails", staffSchema)

module.exports = staffModel