const puppeteer = require('puppeteer');
const util = require('util');
const fs = require('fs');


console.log(process.argv[2]);
console.log(process.argv[3]);


process.exit();

var pageList = JSON.parse(fs.readFileSync('sites.json', 'utf8')).pages;

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
	var resultObject = await page.evaluate(() => {
		var list;

		try {
			list = Array.from(document.querySelectorAll('[data-role]')).filter((node) => {
				return node.dataset.role !== 'none' && node.querySelector('[data-componentname]');
			}).map((node) => {
				var rObj = {};
				node = node.querySelector('[data-componentname]');
				Array.from(node.attributes).forEach((attr) => {
					rObj[attr.name.replace('data-', '').replace('component-', '')] = attr.value;
				});
				return rObj;
			});
		} catch(e) {
			console.log('cannot get list >>> ', e);
		}
		return {
			url: '',
			bodyClass: document.body.classList.value,
			componentList: list
		}
	});

	await browser.close();
	resultObject.url = url;
	return resultObject;
};

(async (pages) => {
	var allPages = [];
	for (const page of pages) {
		allPages.push(await run(page));
	}
	const json = JSON.stringify(allPages);
	try {
		fs.writeFile('report-components.json', json, 'utf8', () => {
			  process.exit();
			});
	} catch(e) {
		console.log("couldn't write file:", e);
	}
})(pageList);
