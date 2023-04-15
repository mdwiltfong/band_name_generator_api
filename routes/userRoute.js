const express = require("express");
const router = express.Router();

const { updateUser, getUser, getUsers } = require("../controllers/users");
