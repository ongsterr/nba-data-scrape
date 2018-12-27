// Jobs config
require('dotenv').config()

const downloadOptions = {
  email: process.env.EMAIL,
  pw: process.env.PW,
  season: 2019,
  numberOfRecords: 300,
}

module.exports = Object.assign({}, { downloadOptions })
