const puppeteer = require('puppeteer');
const util = require('util');
const fs = require('fs');
var pageList = JSON.parse(fs.readFileSync('sites.json', 'utf8')).pages;

// obj.pages.push('www.uol.com.br');
// console.log(obj);
// var json = JSON.stringify(obj);
// fs.writeFile('sites.json', json, 'utf8', end);

// function end() {
//   process.exit();
// }

async function run(url) {
	console.log('>> run:', url);
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: {
			width: 1280,
			height: 900
		}
	});
	const page = await browser.newPage();
	
	var resultObject = {
		url: url,
		bodyClass: '',
		components: []
	};
	var components = [];
	await page.goto(url);
	await page.evaluate(() => {
		resultObject.bodyClass = document.body.classList.value;
		// components =  Array.from(document.querySelectorAll('[data-role]'));
	});

	// remove data-role="null"
	// components = components.filter((node) => {
	// 	return node.dataset.role !== 'none' && node.querySelector('[data-componentname]');
	// });

	// components = components.map((node) => {
	// 	var rObj = {};
	// 	node = node.querySelector('[data-componentname]');
	// 	Array.from(node.attributes).forEach((attr) => {
	// 		rObj[attr.name.replace('data-', '').replace('component-', '')] = attr.value;
	// 	});
	// 	return rObj;
	// });
	// resultObject.components = components;

	await browser.close();
	// return resultObject;
};

(async (pages) => {
	var allPages = [];
	for (const page of pages) {
		allPages.push(await run(page));
	}
	console.log(JSON.stringify(allPages));
})(pageList);

// list.map(async (url)=> {
//   await run(url);
// });