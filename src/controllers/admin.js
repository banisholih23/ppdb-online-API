const admin = require('../models/admin')
const multer = require('multer')
const config = require('../config/multer')
const upload = config.single('image')

module.exports = {
  getAllUsers: async function (request, response) {
    try {
      const result = await admin.getAllUser()

      return response.status(200).json({
        status: 200,
        msg: 'list all Users',
        data: result
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        msg: error,
        data: []
      })
    }
  },

  patchUser: async function (request, response) {
    upload(request, response, async function (error) {
      if (error instanceof multer.MulterError) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] })
      } else if (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] })
      }

      try {
        if (!request.file) {
          return response.status(500).json({
            status: 500,
            message: 'Please choosing files...',
            data: []
          })
        } else {
          const setData = request.body
          const id = request.params.id
          setData.image = `http://localhost:5050/profile_picture/${request.file.filename}`
          console.log(setData)
          await admin.patchUser(setData, id)
          return response
            .status(200)
            .json({ status: 200, message: 'book image has been updated', data: setData })
        }
      } catch (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] })
      }
    })
  },
  deleteUser: async function (request, response) {
    const id = request.params.id
    const result = await admin.deleteUser(id)

    if (result) {
      const data = {
        succes: true,
        msg: `user with id ${id} deleted succesfully`
      }
      response.status(200).send(data)
    } else {
      const data = {
        success: false,
        msg: 'failed to deleted user'
      }
      response.status(400).send(data)
    }
  }
}
