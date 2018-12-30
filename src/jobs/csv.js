const Json2csvParser = require('json2csv').Parser
const fs = require('fs')

const {
  playerStatsRepo,
  playerProjRepo,
  dfsProjRepo,
  gameOddsRepo,
} = require('../repo')

const generateAllCSV = (startDate, endDate) => {
  const statsOptions = {
    repo: playerStatsRepo,
    title: 'PlayerStats',
  }
  generateCSV(startDate, endDate, statsOptions)

  const projOptions = { repo: playerProjRepo, title: 'PlayerProj' }
  generateCSV(startDate, endDate, projOptions)

  const dfsOptions = { repo: dfsProjRepo, title: 'PlayerDFS' }
  generateCSV(startDate, endDate, dfsOptions)

  const oddsOptions = { repo: gameOddsRepo, title: 'GameOdds' }
  generateCSV(startDate, endDate, oddsOptions)
}

const generateCSV = async (startDate, endDate, config) => {
  const { repo, title } = config
  const data = await repo().getData(startDate, endDate)
  if (data.length > 0) {
    const fields = Object.keys(data[0])
    const csvParser = new Json2csvParser({ fields })
    const csv = csvParser.parse(data)
    fs.writeFile(`./csv/${title} (${startDate}--${endDate}).csv`, csv, () =>
      console.log(`${title} (${startDate}-${endDate}) written to CSV`)
    )
  }
}

// Run generate CSV job
generateAllCSV('29-12-2018', '29-12-2018')
