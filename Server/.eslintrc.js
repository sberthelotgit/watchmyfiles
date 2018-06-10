'use strict'
module.exports = {
    "extends": ["google"],
    "parserOptions": {
        "ecmaVersion": 2017,
    },
    "rules": {
        "eol-last": "off",
        "arrow-parens": ["error","as-needed"],
        "max-len": [2, {"code": 120, "tabWidth": 4, "ignoreUrls": true}],
    }
};