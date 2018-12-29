const mongoose = require('mongoose')
const moment = require('moment')

const GameOdds = require('../models/GameOdds')
const { databaseConfig } = require('../config')

const gameOddsRepo = () => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      databaseConfig.dbUrl(),
      databaseConfig.mongoOptions,
      () => console.log('Established connection to MongoDB')
    )
  }

  const saveData = async teamOdds => {
    const condition = {
      concat: teamOdds.concat,
    }
    await GameOdds.findOneAndUpdate(
      condition,
      teamOdds,
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

module.exports = gameOddsRepo
