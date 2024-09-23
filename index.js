// this only generates chess.com accounts and not nitro codes.
// for nitro code generator, contact me on discord @uutu or on telegram @tahagorme

const { connect } = require("puppeteer-real-browser")
const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

async function test() {

    const { browser, page } = await connect({

        headless: false,

        args: [],

        customConfig: {},

        turnstile: true,

        connectOption: {},

        disableXvfb: false,
        ignoreAllFlags: false
        // proxy:{
        //     host:'<proxy-host>',
        //     port:'<proxy-port>',
        //     username:'<proxy-username>',
        //     password:'<proxy-password>'
        // }

    })

    let randomEmail = randomString(15) + '@outlook.com';
    let randomUsername = randomString(15);
    let randomPassword = randomString(15) + randomIntFromInterval(100000, 9999999);
    console.log(randomEmail)
    await page.goto('https://www.chess.com/register')
    await page.waitForSelector("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > div > button")
    await page.click("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > div > button")
    await page.waitForSelector("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > form > div:nth-child(1) > button")
    await page.click("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > form > div:nth-child(1) > button")

    await page.waitForSelector("#registration_email")
    await page.type("#registration_email", randomEmail)

    await page.waitForSelector("#registration_password")
    await page.type("#registration_password", randomPassword)
    await page.waitForSelector("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > form > div:nth-child(6) > button")
    await page.click("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > form > div:nth-child(6) > button")
    await page.waitForSelector("#registration_username")
    await new Promise(r => setTimeout(r, 500))

    await page.type("#registration_username", randomUsername)
    await page.waitForSelector("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > form > div:nth-child(7) > div > div.username-wrap > button")
    await new Promise(r => setTimeout(r, 500))

    await page.click("body > div:nth-child(1) > div > div.security-onboarding-container > main > div > form > div:nth-child(7) > div > div.username-wrap > button")
    await page.waitForNavigation();
    console.log(`Account Created --> ${randomEmail} : ${randomPassword}`)

    //save cookies to file
    await new Promise(r => setTimeout(r, 1000))
    test();




}
let noOfThreads = prompt('Enter number of threads: ');
for (let i = 0; i < noOfThreads; i++) {
    test();
}


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomString(length) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
