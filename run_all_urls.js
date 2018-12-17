//run throug all scripts

const util = require('util');
const fs = require('fs');
const comp = require('./get-component.js')

var localisation_list = ["uk","us","br","ca","au","ar","th","ph","mx","tr","id","in","de","ie","it","nl","se","be","ru","at","es","vn","py","uy","ch","tw","ng","fr"];

var cp = require('child_process');
var n = cp.fork(__dirname + '/get-components.js');

localisation_list.forEach((loc) => {
    await comp.getComponents('./all-localisations/'+loc.toUpperCase()+'.csv', 'report/'+loc+'.json')
})