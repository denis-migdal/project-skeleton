const fs = require('fs');

let skeletons = {};
let skeleton_dir = './webpack/';
let skeleton_files = fs.readdirSync(skeleton_dir);


for(let file in skeleton_files) {
	file = file.split('.').slice(0, -2).join('.');
	skeletons[file] = require(skeleton_dir + file);
}


module.exports = skeletons;