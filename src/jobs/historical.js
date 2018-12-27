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
}

// Run job here...
downloadHistoricalData(downloadOptions, '16-11-2018', 100).then(() =>
  console.log(`Download job completed for data from 16-10-2018 for 100 days.`)
)
