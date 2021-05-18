const childProcess = require("child_process");
const exec = childProcess.exec;
const execSync = childProcess.execSync;

// lint
const initCMD = {
    husky: "npx husky-init && yarn && yarn lint-staged",
    eslint: "yarn add eslint && yarn prettier -D",
    stylelint: "yarn add stylelint stylelint-config-standard -D",
    commit:"yarn add commitizen -D && commitizen init cz-conventional-changelog --yarn --dev --exact",
	commitlint: "yarn add @commitlint/config-conventional @commitlint/cli -D",
};

const stylelint = 'echo {extends: "stylelint-config-standard"} > .stylelintrc.json'
const commitlint = 'echo module.exports = {extends: ["@commitlint/config-conventional"]} > commitlint.config.js'


execSync(initCMD.commit, { stdio: "inherit" });
// execSync(
// 	"webpack serve --config build/webpack.dev.js",
// 	{ stdio: "inherit" },
// 	(error, stdout, stderr) => {
// 		if (error) {
// 			console.error(`执行的错误: ${error}`);
// 			return;
// 		}
// 		console.log(`stdout: ${stdout}`);
// 		console.error(`stderr: ${stderr}`);
// 	}
// );
