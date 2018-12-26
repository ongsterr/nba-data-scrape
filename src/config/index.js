require('dotenv').config()

const databaseConfig = {
  mongoOptions: {
    useNewUrlParser: true,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 120000, // Close sockets after 120 seconds of inactivity
    family: 4,
  },
  dbUrl: isProd =>
    isProd ? process.env.PROD_DATABASE : process.env.TEST_DATABASE,
  dbUpdateOptions: {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  },
}

module.exports = Object.assign({}, { databaseConfig })
