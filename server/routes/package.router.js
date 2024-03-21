/**
 * @swagger
 * components:
 *  schemas:
 *    Package:
 *      type: object
 *      required:
 *        - name_package
 *        - type_package
 *        - max_people
 *        - detail_package
 *        - activity_package
 *        - time_start_package
 *        - time_end_package
 *        - policy_cancel_package
 *        - location
 *        - image
 *        - price_package
 *        - business_user
 *        - review_rating_package
 *      properties:
 *        name_package:
 *          type: string
 *          description: The name of the package
 *        type_package:
 *          type: string
 *          description: The type of the package
 *        max_people:
 *          type: integer
 *          description: The maximum number of people for the package
 *        detail_package:
 *          type: string
 *          description: Details of the package
 *        activity_package:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              activity_name:
 *                type: string
 *                description: The name of the activity
 *        time_start_package:
 *          type: string
 *          format: date-time
 *          description: The start time of the package
 *        time_end_package:
 *          type: string
 *          format: date-time
 *          description: The end time of the package
 *        policy_cancel_package:
 *          type: string
 *          description: The cancellation policy of the package
 *        location:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Location'
 *        image:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Image'
 *        price_package:
 *          type: number
 *          description: The price of the package
 *        homestay:
 *          type: array
 *          items:
 *            type: string
 *            description: The ID of the homestay associated with the package
 *        business_user:
 *          type: array
 *          items:
 *            type: string
 *            description: The ID of the business user associated with the package
 *        review_rating_package:
 *          type: number
 *          description: The review rating of the package
 * tags:
 *  name: Package
 *  description: the Package managing API
 */
const express = require("express");
const router = express.Router();
const {
  getAllPackage,
  searchByTypePackage,
  getByIdPackage,
  createPackage,
  getByPricePackage,
  updatePackage,
  deletePackage,
  searchPackage,
} = require("../controller/package.controller.js");

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
router.get("/package/type/:type_package", searchByTypePackage);
/**
 * @swagger
 * /package/{id}:
 *   get:
 *     summary: Get Package by ID.
 *     tags:    [Package]
 *     parameters:
 *      -   in: path
 *          name: id
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
 *          description: Not Found Package ID
 *       500:
 *          description: Some error happened!!
 */
router.get("/package/:id", getByIdPackage);
/**
 * @swagger
 * /package/price/{price}:
 *   get:
 *     summary: Get Package by price.
 *     tags:    [Package]
 *     parameters:
 *      -   in: path
 *          name: price
 *          required: true
 *          schema:
 *              type: string
 *          description:    the Package price
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
 *          description: Not Found Package ID
 *       500:
 *          description: Some error happened!!
 */
router.get("/package/price/:price", getByPricePackage);
/**
 * @swagger
 * /package:
 *   post:
 *     summary: Create a new Package.
 *     tags:    [Package]
 *     requestBody:
 *          required:   true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/Package'
 *     responses:
 *          201:
 *              description: A list of Package.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schemas/Package'
 *          500:
 *              description: Some error happened
 */
router.post("/package", createPackage);
/**
 * @swagger
 * /package/{id}:
 *   put:
 *     summary: Update the package detail.
 *     tags:    [Package]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    the Package ID
 *     requestBody:
 *      required:   true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref:   '#/components/schemas/Package'
 *     responses:
 *      200:
 *          description: The Package by id.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/Package'
 *      404:
 *          description: Package Not Found
 *      500:
 *          description: Some error happened
 */
router.put("/package/:id", updatePackage);
/**
 * @swagger
 * /package/{id}:
 *   delete:
 *     summary: Delete package by id.
 *     tags:    [Package]
 *     parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description:    The Package Id
 *     responses:
 *      200:
 *          description: Package is deldeted.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/Package'
 *      404:
 *          description: Not Found Package
 *      500:
 *          description: Some error happened
 */
router.delete("/package/:id", deletePackage);
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search Package.
 *     tags: [Package]
 *     parameters:
 *       - in: query
 *         name: name_package
 *         schema:
 *           type: string
 *         description: Search by name.
 *       - in: query
 *         name: type_package
 *         schema:
 *           type: string
 *         description: Search by type.
 *       - in: query
 *         name: detail_package
 *         schema:
 *           type: string
 *         description: Search by detail.
 *     responses:
 *       200:
 *         description: A list of Package.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *       500:
 *         description: Some error happened!!
 */
router.get("/search", searchPackage);

module.exports = router;
