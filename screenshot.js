const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require("fs");
const path = require("path");
const config = require("./screenshot-config.js");

function writeToFile(data, browser, resolution) {
  const fileName = `screenshots/${browser}-${resolution}.png`;
  ensureDirectoryExistence(fileName);
  fs.writeFile(fileName, data, 'base64', function (err) {
    console.log(err);
  });
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

async function takeScreenshots(browser) {
  let driver = await new Builder().forBrowser(browser).build();
  try {
    await driver.get(config.url);
    let rect = await driver.manage().window().getRect();
    for (const breakpoint of config.breakpoints) {
      rect.width = breakpoint;
      await driver.manage().window().setRect(rect);
      const img = await driver.takeScreenshot();
      writeToFile(img, browser, breakpoint);
    }
  } finally {
    await driver.quit();
  }
}

console.log(`Using browsers ${config.browsers.join()}`);
console.log(`Using breakpoint widths ${config.breakpoints.join()}`);

for (const browser of config.browsers) {
  takeScreenshots(browser);
}

