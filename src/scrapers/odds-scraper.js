const puppeteer = require('puppeteer')

const {
  userLoginLink,
  userLoginSelectors,
  oddsLink,
  oddsSelectors,
  progressBar,
} = require('./references')
const { gameOddsRepo } = require('../repo')
const { puppeteerConfig } = require('../config')

const scrapeGameOdds = async ({ date, numOfRecords, email, pw }) => {
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

  await page.goto(oddsLink(date), puppeteerConfig.goToPageOptions)
  await page.waitFor(2000)

  const bar = progressBar('Game Odds Download', numOfRecords / 15)

  for (let i = 1; i <= numOfRecords; i++) {
    const dataCheck = await page.evaluate(
      sel => document.querySelector(sel),
      oddsSelectors.favorite(i)
    )
    if (!dataCheck) break

    const favorite = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      oddsSelectors.favorite(i)
    )
    const underdog = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      oddsSelectors.underdog(i)
    )
    const spread = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      oddsSelectors.spread(i)
    )
    const total = await page.evaluate(
      sel => document.querySelector(sel).innerText,
      oddsSelectors.total(i)
    )

    const favoriteTeam = {
      date,
      team: favorite.substring(0, 2) == 'at' ? favorite.substring(3) : favorite,
      isHome: favorite.substring(0, 2) == 'at',
      isfavorite: true,
      spread: parseFloat(spread),
      total: parseFloat(total),
      concat: date.concat(favorite, underdog),
    }

    const underdogTeam = {
      date,
      team: underdog.substring(0, 2) == 'at' ? underdog.substring(3) : underdog,
      isHome: underdog.substring(0, 2) == 'at',
      isfavorite: false,
      spread: parseFloat(spread) * -1,
      total: parseFloat(total),
      concat: date.concat(underdog, favorite),
    }

    await gameOddsRepo().saveData(favoriteTeam)
    await gameOddsRepo().saveData(underdogTeam)
    bar.tick()
  }

  console.log(`Game Odds Data download completed for ${date}\n`)
  await browser.close()
}

module.exports = scrapeGameOdds
