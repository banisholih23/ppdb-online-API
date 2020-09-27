const express = require('express')
const Route = express.Router()

const user = require('../controllers/user')

Route.post('/user', user.postUser)

module.exports = Route
