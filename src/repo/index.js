const playerStatsRepo = require('./playerStats')
const playerProjRepo = require('./playerProj')
const dfsProjRepo = require('./dfsProj')

module.exports = Object.assign(
  {},
  { playerStatsRepo, playerProjRepo, dfsProjRepo }
)
