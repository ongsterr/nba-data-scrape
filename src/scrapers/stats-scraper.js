const puppeteer = require('puppeteer')

const {
  userLoginLink,
  userLoginSelectors,
  pageSize300,
  playerIdToggle,
  playerStatsLink,
  playerStatsSelectors,
} = require('./references')
const { playerStatsRepo } = require('../repo')

const scrapePlayerStats = async ({ season, date, numOfRecords, email, pw }) => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()
  await page.goto(userLoginLink)
  await page.click(userLoginSelectors.email)
  await page.keyboard.type(email)
  await page.click(userLoginSelectors.password)
  await page.keyboard.type(pw)
  await page.click(userLoginSelectors.loginButton)
  await page.waitFor(2000)

  await page.goto(playerStatsLink(season, date))
  await page.click(pageSize300)
  await page.click(playerIdToggle)
  await page.waitFor(2000)

  for (let i = 1; i <= numOfRecords; i++) {
    const dataCheck = await page.evaluate(
      sel => document.querySelector(sel),
      playerStatsSelectors.playerId(i)
    )
    if (!dataCheck) break

    const playerId = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.playerId(i)
    )
    const playerName = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.playerName(i)
    )
    const team = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.team(i)
    )
    const pos = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.pos(i)
    )
    const opp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.opp(i)
    )
    const pts = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.pts(i)
    )
    const reb = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.reb(i)
    )
    const ast = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.ast(i)
    )
    const blk = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.blk(i)
    )
    const stl = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.stl(i)
    )
    const fgp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.fgp(i)
    )
    const ftp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.ftp(i)
    )
    const tpp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.tpp(i)
    )
    const ftm = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.ftm(i)
    )
    const twopm = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.twopm(i)
    )
    const threepm = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.threepm(i)
    )
    const to = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.to(i)
    )
    const min = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.min(i)
    )
    const td = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.td(i)
    )
    const dd = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.dd(i)
    )
    const fpts = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerStatsSelectors.fpts(i)
    )

    const dataToSave = {
      date,
      playerId,
      playerName,
      team,
      pos,
      opp,
      pts: parseInt(pts),
      reb: parseInt(reb),
      ast: parseInt(ast),
      blk: parseInt(blk),
      stl: parseInt(stl),
      fgp: parseFloat(fgp),
      ftp: parseFloat(ftp),
      tpp: parseFloat(tpp),
      ftm: parseInt(ftm),
      twopm: parseInt(twopm),
      threepm: parseInt(threepm),
      to: parseInt(to),
      min: parseFloat(min),
      dd: !!dd,
      td: !!td,
      fpts: parseInt(fpts),
      concat: date.concat(playerName),
    }

    await playerStatsRepo().saveData(dataToSave)
    console.count('Data saved')
  }

  console.log(`Player stats data download completed for ${date}`)
}

module.exports = scrapePlayerStats
