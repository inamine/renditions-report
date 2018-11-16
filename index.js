const puppeteer = require('puppeteer');
const util = require('util');

var list = [];
async function run (url) {
  const browser = await puppeteer.launch({headless: false, defaultViewport:{ width:1280, height:900}});
  const page = await browser.newPage();
  await page.goto(url);
  var images = await page.evaluate(() => {
      const list = Array.from(document.querySelectorAll("img"));
      return list.map((image)=> {
        return {
          ratio: (Math.floor((image.width/image.naturalWidth)*100))/100,
          naturalWidth: image.naturalWidth,
          width: image.width,
          src: image.src
        };
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
list = ["https://www.breyers.com/us/en/",
"https://www.breyers.com/us/en/100-sustainable-vanilla-video.html",
"https://www.breyers.com/us/en/2-in-1.html",
"https://www.breyers.com/us/en/about.html",
"https://www.breyers.com/us/en/articles/2-in-1.html",
"https://www.breyers.com/us/en/articles/delights-ice-cream-pints.html",
"https://www.breyers.com/us/en/articles/gelato.html",
"https://www.breyers.com/us/en/articles/pledge.html",
"https://www.breyers.com/us/en/articles/vanilla.html",
"https://www.breyers.com/us/en/carbsmart.html",
"https://www.breyers.com/us/en/contact.html",
"https://www.breyers.com/us/en/contact/email-us.html",
"https://www.breyers.com/us/en/contact/faq.html",
"https://www.breyers.com/us/en/cookies-candies.html",
"https://www.breyers.com/us/en/delights.html",
"https://www.breyers.com/us/en/fat-free.html",
"https://www.breyers.com/us/en/gelato-indulgences.html",
"https://www.breyers.com/us/en/gluten-free-ice-cream.html",
"https://www.breyers.com/us/en/grade-a-milk-and-cream-video.html",
"https://www.breyers.com/us/en/lactose-free-ice-cream.html",
"https://www.breyers.com/us/en/no-sugar-added-frozen-dessert.html",
"https://www.breyers.com/us/en/non-dairy-frozen-desserts.html",
"https://www.breyers.com/us/en/non-gmo.html",
"https://www.breyers.com/us/en/original.html",
"https://www.breyers.com/us/en/products.html",
"https://www.breyers.com/us/en/products/black-raspberry-chocolate.html",
"https://www.breyers.com/us/en/products/carbsmart-vanilla.html",
"https://www.breyers.com/us/en/products/chocolate.html",
"https://www.breyers.com/us/en/recipes.html",
"https://www.breyers.com/us/en/recipes/apple-pie-a-la-mode.html",
"https://www.breyers.com/us/en/recipes/banana-cream-dessert-recipe.html",
"https://www.breyers.com/us/en/search.html",
"https://www.breyers.com/us/en/search/articles.html",
"https://www.breyers.com/us/en/search/others.html",
"https://www.breyers.com/us/en/search/products.html",
"https://www.breyers.com/us/en/search/recipes.html",
"https://www.breyers.com/us/en/sign-up.html",
"https://www.breyers.com/us/en/sitemap.html",
"https://www.breyers.com/us/en/store-locator.html",
"https://www.breyers.com/us/es/acerca-de.html",
"https://www.breyers.com/us/es/articulos/2-in-1.html",
"https://www.breyers.com/us/es/articulos/delights-helado-pintas.html",
"https://www.breyers.com/us/es/articulos/gelato.html",
"https://www.breyers.com/us/es/articulos/pledge.html",
"https://www.breyers.com/us/es/articulos/vanilla.html",
"https://www.breyers.com/us/es/breyers-2in1.html",
"https://www.breyers.com/us/es/busca.html",
"https://www.breyers.com/us/es/busca/articulos.html",
"https://www.breyers.com/us/es/busca/otros.html",
"https://www.breyers.com/us/es/busca/productos.html",
"https://www.breyers.com/us/es/busca/recetas.html",
"https://www.breyers.com/us/es/carbsmart.html",
"https://www.breyers.com/us/es/contactanos.html",
"https://www.breyers.com/us/es/contactanos/email-us.html",
"https://www.breyers.com/us/es/contactanos/faq.html",
"https://www.breyers.com/us/es/cookies-candies.html",
"https://www.breyers.com/us/es/delights.html",
"https://www.breyers.com/us/es/descremado.html",
"https://www.breyers.com/us/es/gelato-indulgences.html",
"https://www.breyers.com/us/es/",
"https://www.breyers.com/us/es/leche-y-crema-de-grado-a.html",
"https://www.breyers.com/us/es/magico.html",
"https://www.breyers.com/us/es/non-dairy-frozen-desserts.html",
"https://www.breyers.com/us/es/non-gmo.html",
"https://www.breyers.com/us/es/original-ice-cream.html",
"https://www.breyers.com/us/es/productos.html",
"https://www.breyers.com/us/es/productos/black-raspberry-chocolate.html",
"https://www.breyers.com/us/es/productos/carbsmart-almond-bar.html",
"https://www.breyers.com/us/es/recetas.html",
"https://www.breyers.com/us/es/recetas/banana-split.html",
"https://www.breyers.com/us/es/sign-up.html",
"https://www.breyers.com/us/es/sin-agregado-de-azucar.html",
"https://www.breyers.com/us/es/sin-gluten.html",
"https://www.breyers.com/us/es/sin-lactosa.html",
"https://www.breyers.com/us/es/sitemap.html",
"https://www.breyers.com/us/es/store-locator.html",
"https://www.breyers.com/us/es/vanilla-100--sostenible.html",
"https://www.breyers.com/us/es/vanilla.html"
];

console.log('image src, ratio, largura na pagina, largura real da imagem');
(async (pages) => {
  for (const page of pages) {
    await run(page);
  }
})(list);

// list.map(async (url)=> {
//   await run(url);
// });


