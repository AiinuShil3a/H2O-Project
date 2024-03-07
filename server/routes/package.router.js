const express = require("express");
const router = express.Router();
const {getAllPackage } =require ('../controller/package.controller.js')


router.get("/package", getAllPackage);
// router.get("/package/:id", getById)
// router.post('/package',creatRes)
// router.delete('/package/:id',deleteById)
// router.put('/package/:id',updateById)

module.exports = router;