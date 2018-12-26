const puppeteer = require('puppeteer')

const {
  userLoginLink,
  userLoginSelectors,
  pageSize300,
  playerIdToggle,
  dfsProjLink,
  dfsProjSelectors,
} = require('./references')
const { dfsProjRepo } = require('../repo')

const scrapeDfsProj = async ({ date, platform, numOfRecords, email, pw }) => {
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

  await page.goto(dfsProjLink(date, platform))
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
  await page.waitFor(2000)

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

    const platformName = platform == 2 ? 'FanDuel' : 'DraftKings'

    const dataToSave = {
      date,
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
    console.count('Data saved')
  }

  console.log(`DFS Projection Data download completed for ${date}`)
}

module.exports = scrapeDfsProj

const options = {
  date: '12-20-2018',
  platform: 3,
  numOfRecords: 10,
  email: 'ong.chris11@gmail.com',
  pw: 'Coder2018',
}
scrapeDfsProj(options)
