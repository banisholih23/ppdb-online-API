const user = require('../models/user')
const multer = require('multer')
const config = require('../config/multer')
const upload = config.single('image')

module.exports = {
  postUser: async function (request, response) {
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
          setData.image = `${process.env.APP_URL}profile_picture/${request.file.filename}`
          console.log(setData)
          const result = await user.postUser(setData)
          return response
            .status(200)
            .json({ status: 200, message: 'success', data: result })
        }
      } catch (error) {
        console.log(error)
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] })
      }
    })
  }
}
