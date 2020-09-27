const express = require('express')
const route = express.Router()

const user = require('./routes/user')
const admin = require('./routes/admin')

route.use('/', user)
route.use('/admin', admin)

module.exports = route
