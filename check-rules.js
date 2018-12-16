const puppeteer = require('puppeteer');
const util = require('util');
const fs = require('fs');
var pageList = JSON.parse(fs.readFileSync('sites.json', 'utf8')).pages;
var cssRules = JSON.parse(fs.readFileSync('all-css.json', 'utf8'));

console.log('::: total de regras >>>', cssRules.length);

async function run(url) {
	console.log('>> run:', url);
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: {
			width: 1280,
			height: 900
		}
	});
	const page = await browser.newPage();
	await page.goto(url);
	cssRules = await page.evaluate((rules, clog) => {
        return rules.filter((cssRule) => {
            try {
                return (!document.querySelector(cssRule));
            } catch(e) {
                // clog.log('error on rule:', cssRule, e);
            }
        });
	}, cssRules, console);

    await browser.close();
};

(async (pages) => {
	var allPages = [];
	for (const page of pages) {
		await run(page);
	}
	console.log('::: total de regras ao final >>>', cssRules.length);
	try {
		fs.writeFile('filtered-css.json', JSON.stringify(cssRules), 'utf8', () => {
			  process.exit();
			});
	} catch(e) {
		console.log("couldn't write file:", e);
	}
})(pageList);
