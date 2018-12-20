const fs = require('fs');
const {Cluster} = require('puppeteer-cluster');
const pageList = fs.readFileSync('alllock.txt', 'utf8').split('\n');

var cssRules = JSON.parse(fs.readFileSync('all-views.json', 'utf8'));
console.log('::: total de regras >>>', cssRules.length);


// (async () => {
// 	const cluster = await Cluster.launch({
// 		concurrency: Cluster.CONCURRENCY_CONTEXT,
// 		maxConcurrency: 4,
// 	});

// 	await cluster.task(async ({
// 		page,
// 		data: url
// 	}) => {
// 		console.log('goto:', url);
// 		await page.goto(url);

// 		cssRules = await page.evaluate((rules, clog) => {
// 			return rules.filter((cssRule) => {
// 				try {
// 					return (!document.querySelector(cssRule.rule));
// 				} catch (e) {
// 					// clog.log('error on rule:', cssRule, e);
// 				}
// 			});
// 		}, cssRules, console);


// 	});

// 	for (const page of pageList) {
// 		await cluster.queue(page);
// 	}

// 	await cluster.idle();
// 	await cluster.close();
	
// })().then(()=>{
// 	try {
// 		fs.writeFile('all-views.json', JSON.stringify(cssRules), 'utf8', () => {
// 			process.exit();
// 		});
// 	} catch (e) {
// 		console.log("couldn't write file:", e);
// 	}
// });



(async () => {
    // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
    });

    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page, data: url }) => {
		await page.goto(url);
		cssRules = await page.evaluate((rules, clog) => {
			return rules.filter((cssRule) => {
				try {
					return (!document.querySelector(cssRule.rule));
				} catch (e) {
					// clog.log('error on rule:', cssRule, e);
				}
			});
		}, cssRules, console);
		console.log(url);
		console.log('::: total de regras >>>', cssRules.length);
		console.log('---------')

        // const path = url.replace(/[^a-zA-Z]/g, '_') + '.png';
        // await page.screenshot({ path });
        // console.log(`Screenshot of ${url} saved: ${path}`);
    });

	// Add pages to queue
	pageList.forEach(async (page)=>{
		await cluster.queue(page);
	});

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
})();

