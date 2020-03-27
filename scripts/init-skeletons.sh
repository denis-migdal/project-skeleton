PS_PATH="./node_modules/project-skeleton/"
CURRENT_DIR=`pwd`


cd ${SKLT_PROJECT_DIR}.

mkdir -p ./libs/GUI
mkdir -p ./libs/nodes
mkdir -p ./libs/calc

for var in "$@"
do

	CONFIG_FILE="$PS_PATH./webpack/subproject_types/$var.config.js"

	if test -f "$CONFIG_FILE"; then

		mkdir -p "./src/$var"

		if test -f "./src/$var/webpack.config.js"; then
			echo "$var/webpack.config.js found..."
		else
			echo "$var/webpack.config.js not found..."
			echo "Creating $var/webpack.config.js..."
			cp "$PS_PATH./webpack/default-type.config.js" "./src/$var/webpack.config.js"
		fi

		if [ "$var" = "servers" ]
			npm list socket.io || npm install socket.io
			npm list socket.io-client || npm install socket.io-client
			npm list bufferutil || npm install bufferutil
			npm list utf-8-validate || npm install utf-8-validate
			npm list node-loader || npm install node-loader
		then

		fi

		if [ "$var" = "websites" ] || [ "$var" = "pages" ] || [ "$var" = "webextensions"  ]
		then

			npm list html-minifier-loader || npm install html-minifier-loader
			npm list prehtml-loader || npm install prehtml-loader
			npm list extract-loader || npm install extract-loader
			npm list html-loader || npm install html-loader
			npm list file-loader || npm install file-loader
			npm list url-loader || npm install url-loader
			npm list raw-loader || npm install raw-loader

			npm list style-loader || npm install style-loader
			npm list css-loader || npm install css-loader
		fi

	else
		echo "\033[1m\033[01;31m"
		echo "$var type does not exists ! Skipping..."
		echo "\033[0m"
	fi

done


cd $CURRENT_DIR


echo "\033[1m\033[01;32m"
echo "Initialization succeed\n"
echo "You can run the following commands:"
echo "* 'npm run SKLT_add-subproject type/name[,...]' to add a new subproject."
echo "* 'npm run SKLT_build-(dev|prod) (@all/(all|type)|type/name)[,...]' to build your project."
echo "\033[0m"