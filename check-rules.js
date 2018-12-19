const puppeteer = require('puppeteer');
const util = require('util');
const fs = require('fs');
const csv = process.argv[2];
console.log(csv);
var pageList = fs.readFileSync(csv, 'utf8').split(',').join('').split('\r\n');

var cssRules = JSON.parse(fs.readFileSync('all-views.json', 'utf8'));

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
	
	try {
		await page.goto(url);
	} catch(e) {
		console.log(e, 'invalid URL:', url);
	}

	cssRules = await page.evaluate((rules, clog) => {
        return rules.filter((cssRule) => {
            try {
                return (!document.querySelector(cssRule.rule));
            } catch(e) {
                // clog.log('error on rule:', cssRule, e);
            }
        });
	}, cssRules, console);
	console.log(cssRules.length, "rules to go!");
	if (cssRules.length === 0) {
		console.log('We found all rules!');
		process.exit();
	}
    await browser.close();
};

(async (pages) => {
	var allPages = [];
	for (const page of pages) {
		await run(page);
	}
	console.log('::: total de regras ao final >>>', cssRules.length);
	try {
		fs.writeFile('all-views.json', JSON.stringify(cssRules), 'utf8', () => {
			  process.exit();
			});
	} catch(e) {
		console.log("couldn't write file:", e);
	}
})(pageList);
