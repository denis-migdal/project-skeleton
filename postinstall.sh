echo "Adding scripts to package.json"

cp ../../package.json ../../package.old.json

node > ../../package.json <<EOF
//Read data
const fs = require('fs');
let data = require('../../package.old.json');

//Manipulate data
data.scripts['SKLT_build-dev'] = 'webpack --mode=development --config "\$SKLT_PROJECT_DIR./node_modules/project-skeleton/webpack/default.config.js" --env.PROJECT_DIR "\$SKLT_PROJECT_DIR"  --env.src ';
data.scripts['SKLT_build-prod'] = 'webpack --mode=production --config "\$SKLT_PROJECT_DIR./node_modules/project-skeleton/config/webpack/default.config.js" --env.PROJECT_DIR "\$SKLT_PROJECT_DIR" --env.src ';

data.scripts['SKLT_local-ci-dev'] = 'sudo gitlab-runner exec docker build-dev';

const scripts = fs.readdirSync('./scripts/');
for(let script of scripts)
	data.scripts['SKLT_' + script.split('.')[0]] = '\$SKLT_PROJECT_DIR./node_modules/project-skeleton/scripts/' + script


//Output data
console.log(JSON.stringify(data, null, '\t'));

EOF

rm ../../package.old.json

echo "\033[1m\033[01;32m"
echo "Project Skeleton is now installed.\n"
echo "You can run the following commands:"
echo "* 'npm run SKLT_init-git' to initialize your project with a git repository."
echo "* 'npm run SKLT_init-gitlab-ci' to initialize your project with a gitlab CI/CD pipeline."
echo "* 'npm run SKLT_init-skeletons [pages] [websites] [webextensions] [servers] [commands]' to initialize your project with Project Skeleton architecture."
echo "\033[0m"