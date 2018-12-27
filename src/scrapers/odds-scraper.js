const puppeteer = require('puppeteer')

const {
  userLoginLink,
  userLoginSelectors,
  oddsLink,
  oddsSelectors,
} = require('./references')
const { gameOddsRepo } = require('../repo')

const scrapeGameOdds = async ({ date, numOfRecords, email, pw }) => {
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

  await page.goto(oddsLink(date))
  await page.waitFor(2000)

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
    console.count('Data saved')
  }

  console.log(`Game Odds Data download completed for ${date}`)
}

module.exports = scrapeGameOdds
