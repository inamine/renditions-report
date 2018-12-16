//run throug all scripts



var localisation_list = ["uk","us","br","ca","au","ar","th","ph","mx","tr","id","in","de","ie","it","nl","se","be","ru","at","es","vn","py","uy","ch","tw","ng","fr"];



var cp = require('child_process');
var n = cp.fork(__dirname + '/all-localisations/urls_' + sub + '.js');

localisation_list.forEach