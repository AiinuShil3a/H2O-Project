/**
 * @swagger
 * components:
 *  schemas:
 *      Package:
 *          type: object
 *          required:
 *              -   email
 *              -   price
 *              -   name
 *              -   image
 *              -   quantity
 *          properties:
 *              email:
 *                  type:   string
 *                  description:   the email of the CartItem
 *              price:
 *                  type:   number
 *                  description:   the price of the CartItem
 *              name:
 *                  type:   string
 *                  description:   the name of the CartItem
 *              image:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              quantity:
 *                  type:   string
 *                  description:   the quantity of the CartItem
 *          example:
 *              email:"test@gmail.com"
 *              price:"9999"
 *              name:"package Pro"
 *              image:"http://example.com/macbook.jpg"
 *              quantity:"1"
 * tags:
 *  name: Package
 *  description: the Package managing API
 */
const express = require("express");
const router = express.Router();
const { getAllPackage, searchByTypePackage,getByIdPackage } = require("../controller/package.controller.js");

/**
 * @swagger
 * /package:
 *   get:
 *     summary: get all package.
 *     tags:    [Package]
 *     responses:
 *       200:
 *         description: A list of Package.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref:   '#/components/schemas/package'
 *       500:
 *         description: Some error happened
 */
router.get("/package", getAllPackage);
/**
 * @swagger
 * /package/type/{type_package}:
 *   get:
 *     summary: Get Package by type.
 *     tags:    [Package]
 *     parameters:
 *      -   in: path
 *          name: type_package
 *          required: true
 *          schema:
 *              type: string
 *          description:    the Package type
 *     responses:
 *       200:
 *          description: A list of Package.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref:   '#/components/schemas/Package'
 *       404:
 *          description: Not Found Type Package
 *       500:
 *          description: Some error happened!!
 */
router.get("/package/type/:type_package", searchByTypePackage)
router.get("/package/:id", getByIdPackage)
// router.post('/package',creatRes)
// router.delete('/package/:id',deleteById)
// router.put('/package/:id',updateById)

module.exports = router;
