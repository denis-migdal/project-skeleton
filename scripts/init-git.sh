PS_PATH="./node_modules/project-skeleton/"
CURRENT_DIR=`pwd`

cd ${SKLT_PROJECT_DIR}.

if command -v git >/dev/null 2>&1
then
	echo "Git command found..."

	if git rev-parse --is-inside-work-tree >/dev/null 2>&1
	then
		echo "Git repository found..."
	else
		echo "Git repository not found, creating git repository..."
		git init
	fi

	echo "Adding git aliases..."
	git config --local include.path ../node_modules/project-skeleton/git/gitconfig
	echo "Adding git ignored pattern..."
	grep -vFf ./.git/info/exclude $PS_PATH./git/gitignore >> ./.git/info/exclude

fi

cd $CURRENT_DIR


echo "\033[1m\033[01;32m"
echo "Initialization succeed"
echo "\033[0m"