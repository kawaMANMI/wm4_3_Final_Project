const { merge } = require("webpack-merge");

const common = require("./common.config");

module.exports = merge(common, {
	devtool: "source-map",
	devServer: {
		historyApiFallback: {
			disableDotRule: true,
		},
		port: 3000,
		proxy: {
			"/api": "http://localhost:3100",
		},
	},
	mode: "development",
	optimization: {
		minimize: false,
	},
});
