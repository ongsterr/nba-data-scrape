const playerStatsRepo = require('./playerStats')
const playerProjRepo = require('./playerProj')
const dfsProjRepo = require('./dfsProj')
const gameOddsRepo = require('./gameOdds')

module.exports = Object.assign(
  {},
  { playerStatsRepo, playerProjRepo, dfsProjRepo, gameOddsRepo }
)
