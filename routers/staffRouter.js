const express = require("express")
const router = express.Router()
const {createStaffs, getAll, oneStaff, updateStaffs, deleteStaff } = require("../controllers/staffController")

router.post("/create", createStaffs)

router.get("/allStaffs",  getAll)

router.get("/staff/:id",  oneStaff)

router.put("/update/:id", updateStaffs)

router.delete("/delete/:id", deleteStaff)

module.exports = router