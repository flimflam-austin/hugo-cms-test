// https://www.sanity.io/guides/sanity-and-hugo-with-netlify-plugins

module.exports = {
	onPreBuild: async ({ utils }) => {
		console.log("my plugin loaded!");

		try {
		} catch (error) {
			utils.build.failBuild("Failure message", { error });
		}
	},
};
