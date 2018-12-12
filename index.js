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



var list = [];
var allPages = [];
async function run (url) {
  const browser = await puppeteer.launch({headless: true, defaultViewport:{ width:1280, height:900}});
  const page = await browser.newPage();
  await page.goto(url);
  var resultObject = {
    url: url,
    bodyClass: '',
    components: []
  };
  
  resultObject.components = await page.evaluate(() => {
    var components = Array.from(document.querySelectorAll('[data-role]'));
    // remove data-role="null"
    components = components.filter((node) => {
      return node.dataset.role !== 'none' && node.querySelector('[data-componentname]');
    });

    var results = {
      components:[]
    }

    results.components = components.map((node) => {
      node = node.querySelector('[data-componentname]');
      // console.log(node);
      var rObj = {};
      Array.from(node.attributes).forEach((attr)=> {
        rObj[attr.name.replace('data-', '').replace('component-', '')] = attr.value;
      });
      return rObj;
    });
    console.log(JSON.stringify(results).split('\n').join(''));


    
      });
  });

  console.log('\n\n', 'page:', url, '\n');
  images.forEach((image) => {
    // if (image.naturalWidth > 1340) {
    //   console.log('image too big:', image.src);
    // }
    if (image.ratio < 0.5 || image.ratio > 1) {
      console.log(image.src+','+image.ratio+','+image.width+','+image.naturalWidth);
    }
    // console.log('===============================');
  });

 
  
  // images.forEach((image) => {
  //     console.log('testing:', image.src);
  //     var ratio = image.width/image.naturalWidth;
  //     if (image.naturalWidth > 1340) {
  //       console.log('image without renditions:', image.src);
  //     }
  //     if (ratio < .75 || ratio > 1) {
  //       console.log("image with problems:", image.src );
  //     }
  //     console.log('===============================');
  // });

  await browser.close();
};


// console.log('image src, ratio, largura na pagina, largura real da imagem');
(async (pages) => {
  for (const page of pages) {
    allPages.push(await run(page));
  }
})(list);

// list.map(async (url)=> {
//   await run(url);
// });


