const mongoose = require('mongoose')
const moment = require('moment')

const PlayerStats = require('../models/PlayerStats')
const { databaseConfig } = require('../config')

const playerStatsRepo = () => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      databaseConfig.dbUrl(),
      databaseConfig.mongoOptions,
      () => console.log('Established connection to MongoDB')
    )
  }

  const saveData = async playerData => {
    const condition = {
      concat: playerData.concat,
    }
    await PlayerStats.findOneAndUpdate(
      condition,
      playerData,
      databaseConfig.dbUpdateOptions
    )
  }

  const checkData = async (startDate, endDate) =>
    await PlayerStats.distinct('date', {
      date: {
        $gte: moment(startDate, 'DD-MM-YYYY').toDate(),
        $lte: moment(endDate, 'DD-MM-YYYY').toDate(),
      },
    }).lean()

  return {
    saveData,
    checkData,
  }
}

module.exports = playerStatsRepo
