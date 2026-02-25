const { chromium } = require('playwright');

(async () => {

  const seeds = [65,66,67,68,69,70,71,72,73,74];
  let grandTotal = 0;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {

    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // wait for tables to load (IMPORTANT)
    await page.waitForSelector("table");

    const numbers = await page.$$eval("td", cells =>
      cells.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b)=>a+b,0);
    grandTotal += sum;

    console.log(`Seed ${seed} Sum = ${sum}`);
  }

  console.log("FINAL ANSWER =", grandTotal);

  await browser.close();
})();