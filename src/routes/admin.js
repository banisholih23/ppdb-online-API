const express = require('express')
const Route = express.Router()

const admin = require('../controllers/admin')

Route.get('/all-user', admin.getAllUsers)
Route.patch('/all-user/:id', admin.patchUser)
Route.delete('/all-user/:id', admin.deleteUser)

module.exports = Route
