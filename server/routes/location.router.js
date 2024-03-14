/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name_location
 *         - province_location
 *         - district_location
 *         - subdistrict_location
 *         - zipcode_location
 *         - latitude_location
 *         - longitude_location
 *         - radius_location
 *       properties:
 *         name_location:
 *           type: string
 *           description: The name of the Location
 *         province_location:
 *           type: string
 *           description: The province of the Location
 *         district_location:
 *           type: string
 *           description: The district of the Location
 *         subdistrict_location:
 *           type: string
 *           description: The subdistrict of the Location
 *         zipcode_location:
 *           type: string
 *           description: The zipcode of the Location
 *         latitude_location:
 *           type: string
 *           description: The latitude of the Location
 *         longitude_location:
 *           type: string
 *           description: The longitude of the Location
 *         radius_location:
 *           type: number
 *           description: The radius of the Location
 *       example:
 *         name_location: หาดลำพึง
 *         province_location: ตราด
 *         district_location: เมืองตราด
 *         subdistrict_location: ตราด
 *         zipcode_location: 1772
 *         latitude_location: 12.3456
 *         longitude_location: 78.9012
 *         radius_location: 6326257482232
 * tags:
 *  name: Location
 *  description: the Location managing API
 */
const express = require("express");
const router = express.Router();
const {
    getAllLocation, createLocation
} = require ("../controller/location.controller");
/**
 * @swagger
 * /location:
 *   get:
 *     summary: Get all locations.
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: A list of locations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Internal Server Error
 */
router.get("/location", getAllLocation);
/**
 * @swagger
 * /location:
 *   post:
 *     summary: Create a new location.
 *     tags:    [Location]
 *     requestBody:
 *          required:   true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/Location'
 *     responses:
 *          201:
 *              description: A list of location.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schemas/Location'
 *          500:
 *              description: Some error happened
 */
router.post('/location', createLocation);

module.exports = router;
