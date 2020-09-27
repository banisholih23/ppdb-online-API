const db = require('../config/mysql')

module.exports = {
  postUser: function (setData) {
    return new Promise(function (resolve, reject) {
      db.query('INSERT INTO user SET ?', setData, function (
        error,
        result
      ) {
        if (!error) {
          const newData = {
            id: result.insertId,
            ...setData
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
