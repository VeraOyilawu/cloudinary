const staffModel = require("../models/studentModel")
const cloudinary=require("../utils/cloudinary")

const createStaffs = async(req, res) => {
    try {
        const {name, age, qualification, email,} = req.body
        const picture = await cloudinary.uploader.upload(req.files.profile.tempFilePath,{folder:name},(profile,err)=>{
            try {
                return profile   
            } catch (err) {
                err.message
            }
            })
        
        const bodyData ={
            name, 
            age,
            qualification,
            email,
            profile: {public_id:picture.public_id,
                url:picture.url}
        }

        const validateSchema = {
            name:{
                type:"string",optional:false},
            age:{
                type:"number",optional:false,max:8,min:4},
           gender:{
                type:"string",optional:false},
           email:{
                    type:"string",optional:false},
         profile:{
                    type:"string",optional:false}
        }

        const V = new Validator()
        const validate = V.validate(titleModel,validateSchema)


        const newStaff = await staffModel.create(bodyData)

    if (newStaff) {
        res.status(201).json({
            message: "staff created sucessfully",
            data: newStaff
        })
    } else {
        res.status(404).json({
            message: error.message,
            error: validate[0].message
    })
    }

    } catch (error) {
        res.status(500).json({
            message: error.message
    })
    }
}


const getAll = async(req, res) => {
    try {
        const allStaffs = await staffModel.find()

    res.status(200).json({
        message: "All staffs available are " + allStaffs.length,
        data: allStaffs
    })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const oneStaff = async(req, res) => {
    try {
        const {id} = req.params
        const staff = await staffModel.findById(id)

        res.status(200).json({
            message: "the profile of a staff ",
            data: staff
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateStaffs = async(req, res) => {
    try {
        const staffId = req.params.id
        const {name, age, qualification, email,} = req.body
        const picture = await cloudinary.uploader.upload(req.files.profile.tempFilePath, {folder: name})

        const bodyData = {
            name, 
            age,
            qualification,
            email,
            profile: picture.secure_url
        }

        const updateStaff = await staffModel.findByIdAndUpdate(staffId, bodyData, {new:true})

        res.status(201).json({
            message: "staff updated sucessfully",
            data: updateStaff
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
    })
    }
}



const deleteStaff = async ( req, res ) => {
    try {
        const staffId = req.params.id;
        const cloudinaryID = await staffModel.findById(staffId)
        const realId = cloudinaryID.profile
        const picture=await cloudinary.uploader.destroy(await cloudinary.api.resource(cloudinaryID.profile.public_id).folder,(err)=>{
            try {
                return picture
                console.log("deleted")               
            } catch (err) {
                err.message
            }            
            })
        
        const deletedStaff = await staffModel.findByIdAndDelete( staffId );
        if ( deleteStaff ) {
            res.status( 200 ).json( {
                message:"staff has been deleted successfully"
                
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

module.exports = {
    createStaffs,
    getAll,
    oneStaff,
    updateStaffs,
    deleteStaff
}