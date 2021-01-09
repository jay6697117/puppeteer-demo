const puppeteer = require('puppeteer');
const {timeout} = require('../tools/tools.js');
const urls = require('./urls.js')

puppeteer.launch().then(async browser => {
  let page = await browser.newPage();

  await page.goto(urls[0].link);
  await timeout(2000);
  await page.pdf({ path: './data/weread/0.pdf'});
  page.close();

  // 这里也可以使用promise all，但cpu可能吃紧，谨慎操作
  for (let index = 1; index < urls.length; index++) {
    page = await browser.newPage();

    let url = urls[index];

    await page.goto(url.link);

    await timeout(2000);

    await page.pdf({ path: `./data/weread/${index}.pdf` });

    page.close();
  }

  browser.close();
});
