const ProgressBar = require('progress')

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

const playerProjLink = (season, date) =>
  `https://fantasydata.com/nba-stats/fantasy-basketball-projections?scope=2&season=${season}&seasontype=1&conference=1&date=${date}`

const dfsProjLink = (date, operator = 2) =>
  `https://fantasydata.com/nba-stats/dfs-projections?date=${date}&dfsoperator=${operator}`

const oddsLink = date =>
  `https://fantasydata.com/nba-stats/point-spreads-and-odds?date=${date}`

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

const playerProjSelectors = {
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
  fpts: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td.k-sorted > span`,
}

const dfsProjSelectors = {
  eventDropdown:
    '#home > div > div:nth-child(1) > div:nth-child(2) > div.col-lg-9.col-s-12.col-xxs-12 > div.ddl-wrap.ddl-slate > span',
  eventName: N =>
    `body > div.k-animation-container > div > div.k-list-scroller > ul > li:nth-child(${N}) > div > div.player-info > b`,
  eventSelection: N =>
    `body > div.k-animation-container > div > div.k-list-scroller > ul > li:nth-child(${N})`,
  playerId: N =>
    `#stats_grid > div.k-grid-content-locked > table > tbody > tr:nth-child(${N}) > td.player-id`,
  playerName: N =>
    `#stats_grid > div.k-grid-content-locked > table > tbody > tr:nth-child(${N}) > td.align-left > a`,
  team: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(1) > span`,
  pos: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(2) > span`,
  opp: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(3)`,
  oppRank: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(4)`,
  oppPosRank: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(5)`,
  proj: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(6)`,
  projPerDollar: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(7)`,
  salary: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td.k-sorted`,
}

const oddsSelectors = {
  favorite: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(2) > span`,
  spread: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(3) > span`,
  underdog: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(4) > span`,
  total: N =>
    `#stats_grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${N}) > td:nth-child(5) > span`,
}

const progressBar = (event, total) => {
  const bar = new ProgressBar(
    `Inserting data for ${event}: [:bar] :current :percent :eta      `,
    {
      total,
      callback: () => {
        console.log('Database insert completed :)')
      },
    }
  )
  return bar
}

module.exports = Object.assign(
  {},
  {
    userLoginLink,
    userLoginSelectors,
    pageSize300,
    playerIdToggle,
    playerStatsLink,
    playerProjLink,
    dfsProjLink,
    oddsLink,
    playerStatsSelectors,
    playerProjSelectors,
    dfsProjSelectors,
    oddsSelectors,
    progressBar,
  }
)
