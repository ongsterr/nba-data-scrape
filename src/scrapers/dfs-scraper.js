const puppeteer = require('puppeteer')
const moment = require('moment')

const {
  userLoginLink,
  userLoginSelectors,
  pageSize300,
  playerIdToggle,
  dfsProjLink,
  dfsProjSelectors,
  progressBar,
} = require('./references')
const { dfsProjRepo } = require('../repo')
const { puppeteerConfig } = require('../config')

const scrapeDfsProj = async ({ date, platform, numOfRecords, email, pw }) => {
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

  await page.goto(dfsProjLink(date, platform), puppeteerConfig.goToPageOptions)
  await page.click(pageSize300)
  await page.click(playerIdToggle)
  await page.click(dfsProjSelectors.eventDropdown)
  for (let h = 1; h <= 10; h++) {
    const eventCheck = await page.evaluate(
      sel => document.querySelector(sel),
      dfsProjSelectors.eventName(h)
    )
    if (!eventCheck) break

    const eventName = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.eventName(h)
    )
    if (eventName == 'Main') {
      await page.click(dfsProjSelectors.eventSelection(h))
      break
    }
  }

  try {
    await page.waitForSelector(dfsProjSelectors.playerId(1), {
      timeout: 20000,
    })
  } catch (e) {
    console.log('No data... Timeout...')
  }

  const bar = progressBar('DFS Projection Download', numOfRecords)
  const platformName = platform == 2 ? 'FanDuel' : 'DraftKings'

  for (let i = 1; i <= numOfRecords; i++) {
    const dataCheck = await page.evaluate(
      sel => document.querySelector(sel),
      dfsProjSelectors.playerId(i)
    )
    if (!dataCheck) break

    const playerId = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.playerId(i)
    )
    const playerName = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.playerName(i)
    )
    const team = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.team(i)
    )
    const pos = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.pos(i)
    )
    const opp = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.opp(i)
    )
    const oppRank = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.oppRank(i)
    )
    const oppPosRank = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.oppPosRank(i)
    )
    const proj = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.proj(i)
    )
    const projPerDollar = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.projPerDollar(i)
    )
    const salary = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      dfsProjSelectors.salary(i)
    )

    const dataToSave = {
      date: moment(date, 'MM-DD-YYYY').toDate(),
      playerId,
      playerName,
      team,
      pos,
      opp,
      oppRank: parseInt(oppRank),
      oppPosRank: parseInt(oppPosRank),
      proj: parseFloat(proj),
      projPerDollar: parseFloat(projPerDollar),
      salary: parseInt(salary),
      platform: platformName,
      concat: date.concat(playerName, platformName),
    }

    await dfsProjRepo().saveData(dataToSave)
    bar.tick()
  }

  console.log(
    `DFS Projection Data download completed for ${platformName} on ${date}\n`
  )
  await browser.close()
}

module.exports = scrapeDfsProj
