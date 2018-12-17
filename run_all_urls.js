//run throug all scripts

const util = require('util');
const fs = require('fs');

var localisation_list = ["uk","us","br","ca","au","ar","th","ph","mx","tr","id","in","de","ie","it","nl","se","be","ru","at","es","vn","py","uy","ch","tw","ng","fr"];



var pages = fs.readFileSync('all-localisations/uk.csv', 'utf8');

pages = pages.split(',').join('').split('\r\n');

var counter = 0;
var deep = 0;
var lastCategory = "";


// testando para ver se há mais linguas na localização:
var page = pages[0].split('/');
if (page[4].length === 2) {
    deep = 5;
} else {
    deep = 4;
}



pages.forEach((page)=>{
    page = page.split('/');

    // primeiro nivel. continuar.
    if(page.length === (deep + 1)) {
        // console.log('resetando aqui', page.length, page, deep);
        counter = 0;
        lastCategory = "";
        
    } 

    // repetindo a categoria - somar
    
    if (lastCategory === page[page.length-2]) {
        // console.log('category equal');
        counter ++;
    } else {
        // console.log('diff category:', lastCategory, " | page:",page[page.length-2],' | test:', lastCategory == page[page.length-2])
        lastCategory = page[page.length-2]
        counter = 0;
    }
    

    

    if (counter < 3) {
        console.log('>>> :', lastCategory, counter, page.join('/'));
    } else {
        console.log('@@@ :', lastCategory, counter, page.join('/'));
    }
});

// var cp = require('child_process');
// var n = cp.fork(__dirname + '/all-localisations/urls_' + sub + '.js');

// localisation_list.forEach