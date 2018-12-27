// Download historical data
const moment = require('moment')

const { downloadOptions } = require('./config')
const {
  scrapePlayerStats,
  scrapePlayerProj,
  scrapeDfsProj,
  scrapeGameOdds,
} = require('../scrapers')

const downloadHistoricalData = async (
  downloadOptions,
  startDate,
  periodInDays
) => {
  const momentStartDate = moment(startDate, 'dd-mm-yyyy')

  for (let i = 0; i < periodInDays; i++) {
    const date = momentStartDate.add(i, 'd')
    const statsDownloadOptions = {
      ...downloadOptions,
      date: date.format('mm-dd-yyyy'),
    }
    await scrapePlayerStats(statsDownloadOptions)

    const projDownloadOptions = {
      ...downloadOptions,
      date: date.format('mm-dd-yyyy'),
    }
    await scrapePlayerProj(projDownloadOptions)

    const fanduelDownloadOptions = {
      ...downloadOptions,
      platform: 2,
    }
    await scrapeDfsProj(fanduelDownloadOptions)

    const draftkingsDownloadOptions = { ...downloadOptions, platform: 3 }
    await scrapeDfsProj(draftkingsDownloadOptions)

    await scrapeGameOdds(downloadOptions)
  }
}

// Run job here...
downloadHistoricalData(downloadOptions, '10-16-2018', 100).then(() =>
  console.log(
    `Download job completed for data from ${moment(
      '10-16-2018',
      'mm-dd-yyyy'
    ).format('dd-mm-yyyy')} for 100 days.`
  )
)
