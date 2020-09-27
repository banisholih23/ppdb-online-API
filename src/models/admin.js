const db = require('../config/mysql')

module.exports = {
  getAllUser: function () {
    return new Promise(function (resolve, reject) {
      db.query('SELECT * FROM user', function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE user SET ? WHERE id = ?',
        [setData, id],
        function (error, result) {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  deleteUser: function (id) {
    return new Promise(function (resolve, reject) {
      db.query('DELETE FROM user WHERE id = ?', id, function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
