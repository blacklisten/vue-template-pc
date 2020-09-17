exports.devDependencies = {
  'husky': '^4.3.0',
  'commitizen': '^4.2.1'
}
exports.husky = {
  "hooks": {
    "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
    "pre-commit": "lint-staged"
  }
}
exports['lint-staged'] = {
  "src/**/*.{ts,tsx,vue}": [
    "npm run jslint",
    "git add"
  ],
  "*.{scss,vue}": [
    "npm run stylelint",
    "git add"
  ]
}
exports.config = {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
}
