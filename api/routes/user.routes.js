const express = require("express");
const { signup, signin, logout } = require("../controllers/user.controller");

// initializing router
const router = express.Router();

// using the swagger library for node documentation
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and stores it in the database
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful registration
 *       400:
 *         description: Bad request, missing or invalid parameters
 */
 router.post("/register", signup);

 /**
  * @swagger
  * /api/auth/login:
  *   post:
  *     summary: Log in with existing user credentials
  *     description: Validates user credentials and generates a session token
  *     tags: [Authentication]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               email:
  *                 type: string
  *               password:
  *                 type: string
  *     responses:
  *       200:
  *         description: Successful login
  *       401:
  *         description: Unauthorized, invalid credentials
  */
 router.post("/login", signin);
 
 /**
  * @swagger
  * /api/auth/logout:
  *   get:
  *     summary: Log out the current user
  *     description: Deletes the session cookie associated with the user
  *     tags: [Authentication]
  *     responses:
  *       200:
  *         description: Successful logout
  */
 router.get("/logout", logout);

//exporting router
module.exports = router;
