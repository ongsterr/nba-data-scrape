const puppeteer = require('puppeteer')

const {
  userLoginLink,
  userLoginSelectors,
  pageSize300,
  playerIdToggle,
  playerProjLink,
  playerProjSelectors,
  progressBar,
} = require('./references')
const { playerProjRepo } = require('../repo')
const { puppeteerConfig } = require('../config')

const scrapePlayerProj = async ({ season, date, numOfRecords, email, pw }) => {
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

  await page.goto(playerProjLink(season, date), puppeteerConfig.goToPageOptions)
  await page.click(pageSize300)
  await page.click(playerIdToggle)
  await page.waitFor(2000)

  const bar = progressBar('Player Projections Download', numOfRecords)

  for (let i = 1; i <= numOfRecords; i++) {
    const dataCheck = await page.evaluate(
      sel => document.querySelector(sel),
      playerProjSelectors.playerId(i)
    )
    if (!dataCheck) break

    const playerId = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.playerId(i)
    )
    const playerName = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.playerName(i)
    )
    const team = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.team(i)
    )
    const pos = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.pos(i)
    )
    const opp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.opp(i)
    )
    const pts = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.pts(i)
    )
    const reb = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.reb(i)
    )
    const ast = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.ast(i)
    )
    const blk = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.blk(i)
    )
    const stl = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.stl(i)
    )
    const fgp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.fgp(i)
    )
    const ftp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.ftp(i)
    )
    const tpp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.tpp(i)
    )
    const ftm = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.ftm(i)
    )
    const twopm = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.twopm(i)
    )
    const threepm = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.threepm(i)
    )
    const to = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.to(i)
    )
    const min = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.min(i)
    )
    const fpts = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      playerProjSelectors.fpts(i)
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
      fpts: parseFloat(fpts),
      concat: date.concat(playerName),
    }

    await playerProjRepo().saveData(dataToSave)
    bar.tick()
  }

  console.log(`Player projection data download completed for ${date}\n`)
}

module.exports = scrapePlayerProj
