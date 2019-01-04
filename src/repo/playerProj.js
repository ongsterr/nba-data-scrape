const mongoose = require('mongoose')
const moment = require('moment')

const PlayerProj = require('../models/PlayerStatsProj')
const { databaseConfig } = require('../config')

const playerProjRepo = () => {
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
    await PlayerProj.findOneAndUpdate(
      condition,
      playerData,
      databaseConfig.dbUpdateOptions
    )
  }

  const checkData = async (startDate, endDate) =>
    await PlayerProj.distinct('date', {
      date: {
        $gte: moment(startDate, 'DD-MM-YYYY').toDate(),
        $lte: moment(endDate, 'DD-MM-YYYY').toDate(),
      },
    }).lean()

  const getData = async (startDate, endDate) =>
    await PlayerProj.find({
      date: {
        $gte: moment(startDate, 'DD-MM-YYYY').toDate(),
        $lte: moment(endDate, 'DD-MM-YYYY').toDate(),
      },
    }).lean()

  const aggregateData = async (startDate, endDate) =>
    await PlayerProj.aggregate([
      {
        $lookup: {
          from: 'playerstats',
          let: { first_concat: '$concat' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$concat', '$$first_concat'] }],
                },
              },
            },
            {
              $project: {
                _id: 0,
                __v: 0,
                date: 0,
                team: 0,
                opp: 0,
                playerId: 0,
                playerName: 0,
              },
            },
          ],
          as: 'actuals',
        },
      },
      {
        $lookup: {
          from: 'playerdfsprojs',
          let: { first_date: '$date', first_player: '$playerId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$date', '$$first_date'] },
                    { $eq: ['$playerId', '$$first_player'] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                __v: 0,
                date: 0,
                team: 0,
                opp: 0,
                playerId: 0,
                playerName: 0,
              },
            },
          ],
          as: 'dfs',
        },
      },
      {
        $match: {
          date: {
            $gte: moment(startDate, 'DD-MM-YYYY').toDate(),
            $lte: moment(endDate, 'DD-MM-YYYY').toDate(),
          },
        },
      },
    ])

  return {
    saveData,
    checkData,
    getData,
    aggregateData,
  }
}

module.exports = playerProjRepo
