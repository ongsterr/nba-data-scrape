const scrapePlayerStats = require('./stats-scraper')
const scrapePlayerProj = require('./proj-scraper')
const scrapeDfsProj = require('./dfs-scraper')
const scrapeGameOdds = require('./odds-scraper')

module.exports = Object.assign(
  {},
  { scrapePlayerStats, scrapePlayerProj, scrapeDfsProj, scrapeGameOdds }
)
