const userLoginLink = `https://fantasydata.com/user/login`
const userLoginSelectors = {
  email: `#Email`,
  password: `#Password`,
  loginButton: `#fd-form > div.submit-button > button`,
}

const pageSize300 =
  '#home > div > div.stats-grid-container > div.show-player-id > div:nth-child(2) > a:nth-child(4)'

const playerIdToggle =
  '#home > div > div.stats-grid-container > div.show-player-id > div:nth-child(2) > label:nth-child(5) > label > span'

const playerStatsLink = (season, date) =>
  `https://fantasydata.com/nba-stats/fantasy-basketball-leaders?scope=2&season=${season}&seasontype=1&conference=1&date=${date}`

const playerStatsSelectors = {
  playerId: N =>
    `#stats_grid > div.k-grid-content-locked > table > tbody > tr:nth-child(${N}) > td.player-id`,
  playerName: N =>
    `#stats_grid > div.k-grid-content-locked > table > tbody > tr:nth-child(${N}) > td.align-left > a:nth-child(2)`,
  team: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(1) > span`,
  pos: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(2) > span`,
  opp: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(3)`,
  pts: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(4)`,
  reb: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(5)`,
  ast: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(6)`,
  blk: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(7)`,
  stl: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(8)`,
  fgp: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(9)`,
  ftp: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(10)`,
  tpp: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(11)`,
  ftm: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(12)`,
  twopm: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(13)`,
  threepm: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(14)`,
  to: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(15)`,
  min: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(16)`,
  dd: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(17)`,
  td: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(18)`,
  fpts: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(19)`,
}

module.exports = Object.assign(
  {},
  {
    userLoginLink,
    userLoginSelectors,
    pageSize300,
    playerIdToggle,
    playerStatsLink,
    playerStatsSelectors,
  }
)
