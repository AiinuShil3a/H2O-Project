/**
 * @swagger
 * components:
 *  schemas:
 *      HomeStay:
 *          type: object
 *          required:
 *              -   name
 *              -   type
 *              -   detail
 *              -   time_checkin
 *              -   time_checkout
 *              -   policy_cancle
 *              -   location
 *              -   image
 *              -   maxPeople
 *              -   bathroom
 *              -   bedroom
 *              -   sizebed
 *              -   facilities
 *              -   price
 *              -   business_user
 *              -   reviewRating
 *              -   statusSell
 *          properties:
 *              name:
 *                  type:   string
 *                  description:   the email of the CartItem
 *              type:
 *                  type:   string
 *                  description:   the price of the CartItem
 *              detail:
 *                  type:   string
 *                  description:   the name of the CartItem
 *              time_checkin:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              time_checkout:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              policy_cancle:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              location:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              image:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              maxPeople:
 *                  type:   number
 *                  description:   the image of the CartItem
 *              bathroom:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              bedroom:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              facilities:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              price:
 *                  type:   number
 *                  description:   the image of the CartItem
 *              business_user:
 *                  type:   string
 *                  description:   the image of the CartItem
 *              reviewRating:
 *                  type:   number
 *                  description:   the image of the CartItem
 *              statusSell:
 *                  type:   boolean
 *                  description:   the quantity of the aa
 *          example:
 *              name: "Cozy Cottage"
 *              type: "Private Room"
 *              detail: "A comfortable and peaceful stay for nature lovers"
 *              time_checkin: "14:00"
 *              time_checkout: "12:00"
 *              policy_cancle: "Flexible"
 *              location: "Green Valley, Example City"
 *              image: "http://example.com/cozy_cottage.jpg"
 *              maxPeople: 2
 *              bathroom: "Private"
 *              bedroom: "1"
 *              facilities: "Wi-Fi, TV, Kitchenette"
 *              price: 80.99
 *              business_user: "JohnDoe123"
 *              reviewRating: 4.5
 *              statusSell: true
 * tags:
 *  name: HomeStay
 *  description: the Package managing API
*/
const express = require("express");
const router = express.Router();
const {  createHomeStay, getAllHomeStay , getIdHomeStay } = require("../controller/homestay.controller.js");
/**
 * @swagger
 * /homestay:
 *   get:
 *     summary: get all package.
 *     tags:    [HomeStay]
 *     responses:
 *       200:
 *         description: A list of HomeStay.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref:   '#/components/schemas/HomeStay'
 *       500:
 *         description: Some error happened
 */

router.get("/" , getAllHomeStay)

/**
 * @swagger
 * /homestay/{id}:
 *   get:
 *     summary: Get Package by ID.
 *     tags:    [HomeStay]
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
 *                          $ref:   '#/components/schemas/HomeStay'
 *       404:
 *          description: Not Found Package ID
 *       500:
 *          description: Some error happened!!
 */

router.get("/:id" ,getIdHomeStay)

/**
 * @swagger
 * /homestay:
 *   post:
 *     summary: Create a new Package.
 *     tags:    [HomeStay]
 *     requestBody:
 *          required:   true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/HomeStay'
 *     responses:
 *          200:
 *              description: A list of HomeStay.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schemas/HomeStay'
 *          500:
 *              description: Some error happened
 */

router.post("/" , createHomeStay)







module.exports = router;
