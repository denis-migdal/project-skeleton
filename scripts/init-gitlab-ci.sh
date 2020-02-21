PS_PATH="./node_modules/project-skeleton/"
CURRENT_DIR=`pwd`

cd ${SKLT_PROJECT_DIR}.

if test -f "./.gitlab-ci.yml"; then

    echo "\033[1m\033[01;31m"
	echo ".gitlab-ci.yml file found, merging the files..."

	if test -f "./.SKLT_gitlab-ci/default.yml"; then
		ORIG=./.SKLT_gitlab-ci/default.yml
	else
		ORIG=/dev/null
	fi

	git merge-file .gitlab-ci.yml $ORIG $PS_PATH./gitlab-ci/default.yml

	echo "Please check .gitlab-ci.yml file to fix conflicts if any."
	echo "\033[0m"
else
	cp $PS_PATH./gitlab-ci/default.yml ./.gitlab-ci.yml
fi

echo "Adding gitlab ci"
cp -r $PS_PATH./gitlab-ci ./.SKLT_gitlab-ci


cd $CURRENT_DIR


echo "\033[1m\033[01;32m"
echo "Initialization succeed"
echo "\033[0m"