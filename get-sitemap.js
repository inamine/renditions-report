const fetch = require('node-fetch');
const fs = require('fs');
const loc = ["https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ar/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/at/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/au/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/be/fr/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/be/nl/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/br/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ca/en/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ca/fr/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ch/fr/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ch/de/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/de/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/dk/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/es/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/fr/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/id/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ie/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/in/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/it/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/mx/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ng/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/nl/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ph/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/py/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/ru/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/se/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/th/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/tr/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/tw/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/uk/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/us/en/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/us/es/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/uy/sitemap.xml",
"https://unileverd2uat:4nileverd%40ua%21@knorrd2-uat.unileversolutions.com/vn/sitemap.xml"];



    var text = []
    loc.forEach((url)=>{
        fetch(url)
            .then(res => res.text())
            .then(body => {
                console.log(body);
                // fs.writeFile('./sitemap/'+url, body, 'utf8', () => {
                //     console.log('done', url);
                //   });
                // console.log('got body', url);
            });
    });
