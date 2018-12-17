//run throug all scripts

const util = require('util');
const fs = require('fs');
const getComponents = require('./get-components.js');

// var localisation_list = ["uk","us","br","ca","au","ar","th","ph","mx","tr","id","in","de","ie","it","nl","se","be","ru","at","es","vn","py","uy","ch","tw","ng","fr"];
var localisation_list = ["uk","us","br"];


localisation_list.forEach((loc) => {
    // console.log('./all-localisations/'+loc.toUpperCase()+'.csv', 'report/'+loc+'.json');
    await getComponents('./all-localisations/'+loc.toUpperCase()+'.csv', 'report/'+loc+'.json')
})