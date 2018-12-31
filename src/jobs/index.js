const { downloadOptions } = require('./config')
const { downloadHistoricalData, runReport } = require('./historical')
const { generateAllCSV } = require('./csv')

// Run download job
downloadHistoricalData(downloadOptions, '30-12-2018', '30-12-2018').then(() =>
  console.log('Download job completed!')
)

// Run download report
runReport('16-10-2018', '30-12-2018')

// Generate csv data
generateAllCSV('30-12-2018', '30-12-2018')
