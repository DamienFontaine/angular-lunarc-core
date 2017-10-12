const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: "./src/angular-lunarc-core.js",
    },
    output: {
        path: __dirname + "/lib/",
        filename: "angular-lunarc-core.js"
    }
};
