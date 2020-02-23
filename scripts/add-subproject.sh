PS_PATH="./node_modules/project-skeleton/"
CURRENT_DIR=`pwd`


cd ${SKLT_PROJECT_DIR}.

for var in "$@"
do

	mkdir "./src/$var"
	touch "./src/$var/main.js"

	if test -f "./src/$var/webpack.config.js"; then
		echo "$var/webpack.config.js found..."
	else
		echo "$var/webpack.config.js not found..."
		echo "Creating $var/webpack.config.js..."
		cp "$PS_PATH./webpack/default-subproject.config.js" "./src/$var/webpack.config.js"

	fi

done

cd $CURRENT_DIR

echo "\033[1m\033[01;32m"
echo "You can run the following commands:"
echo "* 'npm run SKLT_build-(dev|prod) (@all/(all|type)|type/name)[,...]' to build your project."
echo "\033[0m"