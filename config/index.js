'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    build: {
        env: require("./prod.env"),
        index: path.resolve(__dirname, "../dist/index.html"),
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: "static",
        assetsPublicPath: "./",
        productionSourceMap: false,
        devtool: "#source-map",
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        // Paths
        env: require("./dev.env"),
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        host: "localhost",
        port: 9090,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: false,
        showEslintErrorsInOverlay: false,
        devtool: "cheap-module-eval-source-map",
        cacheBusting: true,
        cssSourceMap: true,
        proxyTable: {
            // "/api/": {
            //     target: "http://192.168.0.22:13001",
            //     changeOrigin: true,
            //     pathRewrite: { "^/api": "/api" }
            // }
        }
    }
};