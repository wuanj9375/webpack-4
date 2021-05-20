const execSync = require("child_process").execSync;

const eslint = "npx --no-install eslint --fix src/**/*.{js,ts}";
const stylelint = "";
execSync(eslint, { stdio: "inherit" });
