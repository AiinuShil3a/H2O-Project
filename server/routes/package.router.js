const express = require("express");
const router = express.Router();
const {getAll ,getById ,creatRes, deleteById, updateById} =require ('../controller/packge.controller.js')


router.get("/pachage", getAll);
router.get("/pachage/:id", getById)
router.post('/pachage',creatRes)
router.delete('/pachage/:id',deleteById)
router.put('/pachage/:id',updateById)

module.exports = router;