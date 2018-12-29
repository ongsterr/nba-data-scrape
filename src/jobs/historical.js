// Download historical data
const moment = require('moment')
const EventEmitter = require('events')

const { downloadOptions } = require('./config')
const {
  scrapePlayerStats,
  scrapePlayerProj,
  scrapeDfsProj,
  scrapeGameOdds,
} = require('../scrapers')
const {
  playerStatsRepo,
  playerProjRepo,
  dfsProjRepo,
  gameOddsRepo,
} = require('../repo')

EventEmitter.defaultMaxListeners = 1000 // depends on number of items scraped

const downloadHistoricalData = async (
  downloadOptions,
  startDate,
  periodInDays
) => {
  const momentStartDate = moment(startDate, 'DD-MM-YYYY')

  for (let h = 0; h < periodInDays; h++) {
    const date = momentStartDate.add(1, 'days')
    const statsDownloadOptions = {
      ...downloadOptions,
      date: date.format('MM-DD-YYYY'),
    }
    await scrapePlayerStats(statsDownloadOptions)

    const projDownloadOptions = {
      ...downloadOptions,
      date: date.format('MM-DD-YYYY'),
    }
    await scrapePlayerProj(projDownloadOptions)

    const fanduelDownloadOptions = {
      ...downloadOptions,
      platform: 2,
      date: date.format('MM-DD-YYYY'),
    }
    await scrapeDfsProj(fanduelDownloadOptions)

    const draftkingsDownloadOptions = {
      ...downloadOptions,
      platform: 3,
      date: date.format('MM-DD-YYYY'),
    }
    await scrapeDfsProj(draftkingsDownloadOptions)

    const oddsDownloadOptions = {
      ...downloadOptions,
      date: date.format('MM-DD-YYYY'),
    }
    await scrapeGameOdds(oddsDownloadOptions)
  }

  downloadReport(startDate, endDate, playerStatsRepo, 'Player Stats Download')
  downloadReport(
    startDate,
    endDate,
    playerProjRepo,
    'Player Projections Download'
  )
  downloadReport(startDate, endDate, dfsProjRepo, 'DFS Projections Download')
  downloadReport(startDate, endDate, gameOddsRepo, 'Game Odds Download')
}

const downloadReport = async (startDate, endDate, repo, repoName) => {
  const startDateMoment = moment(startDate, 'DD-MM-YYYY')
  const endDateMoment = moment(endDate, 'DD-MM-YYYY')
  const period = endDateMoment.diff(startDateMoment, 'days')

  const downloadArr = await repo().checkData(startDate, endDate)
  const downloadArrDates = downloadArr.map(x => x.toDateString())
  const downloadArrCount = downloadArr.length

  const missingDates = getDateArr(startDate, endDate).filter(
    x => !downloadArrDates.sort().includes(x)
  )

  console.log(`Missing dates for ${repoName}:`)
  console.log(missingDates)
  console.log(
    `Number of missing dates: ${
      period - downloadArrCount == 0 ? 'NA' : period - downloadArrCount
    }`
  )
}

const getDateArr = (startDate, endDate) => {
  const startDateMoment = moment(startDate, 'DD-MM-YYYY')
  const endDateMoment = moment(endDate, 'DD-MM-YYYY')
  const period = endDateMoment.diff(startDateMoment, 'days')
  const dateArr = []

  for (let i = 0; i < period; i++) {
    dateArr.push(
      startDateMoment
        .add(1, 'd')
        .toDate()
        .toDateString()
    )
  }

  return dateArr
}

// Run job here...
downloadHistoricalData(downloadOptions, '27-12-2018', 1).then(() =>
  console.log(`Download job completed...`)
)
