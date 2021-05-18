const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const appDir = process.cwd();
const resolveApp = relative => path.resolve(appDir, relative);
const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified."
  );
}

const dotenvPath = resolveApp(".env");
const dotenvPaths = [
  `${dotenvPath}.${NODE_ENV}.local`,
  `${dotenvPath}.${NODE_ENV}`,
  `${dotenvPath}.local`,
  `${dotenvPath}`,
];

const setNodeEnvVar = () => {
  dotenvPaths.forEach(path => {
    if (fs.existsSync(path)) {
      dotenvExpand(
        dotenv.config({
          path,
        })
      );
    }
  });
};

setNodeEnvVar();

const APP = /^APP_/i;
function getClientEnvVar() {
  const raw = Object.keys(process.env)
    .filter(key => APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || "development",
        BASE_URL: process.env.BASE_URL || "/",
      }
    );

  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvVar;
