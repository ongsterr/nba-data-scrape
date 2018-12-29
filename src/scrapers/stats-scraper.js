const puppeteer = require('puppeteer')
const moment = require('moment')

const {
  userLoginLink,
  userLoginSelectors,
  pageSize300,
  playerIdToggle,
  playerStatsLink,
  playerStatsSelectors,
  progressBar,
} = require('./references')
const { playerStatsRepo } = require('../repo')
const { puppeteerConfig } = require('../config')

const scrapePlayerStats = async ({ season, date, numOfRecords, email, pw }) => {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()
  await page.goto(userLoginLink, puppeteerConfig.goToPageOptions)
  await page.click(userLoginSelectors.email)
  await page.keyboard.type(email)
  await page.click(userLoginSelectors.password)
  await page.keyboard.type(pw)
  await page.click(userLoginSelectors.loginButton)
  await page.waitFor(2000)

  await page.goto(
    playerStatsLink(season, date),
    puppeteerConfig.goToPageOptions
  )
  await page.click(pageSize300)
  await page.click(playerIdToggle)
  await page.waitFor(2000)

  const bar = progressBar('Player Stats Download', numOfRecords)

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
      date: moment(date, 'MM-DD-YYYY').toDate(),
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
    bar.tick()
  }

  console.log(`Player stats data download completed for ${date}\n`)
  await browser.close()
}

module.exports = scrapePlayerStats
