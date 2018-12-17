const puppeteer = require('puppeteer');
const util = require('util');
const fs = require('fs');

var counter = 0;
var deep = 0;
var lastCategory = "";
const pass = "unileverd2uat:4nileverd%40ua%21@";


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

async function getComponents (csv, final) {
	counter = 0;
	deep = 0;
	lastCategory = "";

	var pages = fs.readFileSync(csv, 'utf8');
	pages = pages.split(',').join('').split('\r\n');

	var allPages = [];
	var page = pages[0].split('/');
	if (page[4].length === 2) {
		deep = 5;
	} else {
		deep = 4;
	}
	for (const page of pages) {
		page = checkURL(page);
		if (page) {
			allPages.push(await run(page));
		}
	}
	const json = JSON.stringify(allPages);
	try {
		fs.writeFile(final, json, 'utf8', () => {
			  process.exit();
			});
	} catch(e) {
		console.log("couldn't write file:", e);
	}
};



function checkURL(url) {
	var page = url.split('/');

    // primeiro nivel.
    if(page.length === (deep + 1)) {
        counter = 0;
        lastCategory = "";
    } 

    // repetindo a categoria - somar
    if (lastCategory === page[page.length-2]) {
        counter ++;
    } else { // categoria diferente, resetar
        lastCategory = page[page.length-2]
        counter = 0;
    }
    
    if (counter < 3) {
		page[2] = pass + page[2]
		return page.join('/');
    } else {
        return false;
    }
} 
