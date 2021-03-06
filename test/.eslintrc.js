module.exports = {
  "extends": [
    "../../.eslintrc.js",
  ],
  "env": {
    "mocha": true
  },
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ['**/*.js']}]
  }
}
