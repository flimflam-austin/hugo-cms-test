const rebuildContent = require("./../../buildscripts/sanityToHugo/index");

module.exports = {
  onPreBuild: async ({ utils, packageJson }) => {
    console.log("Starting plugin");

    try {
      console.log("Starting content rebuild.");

      rebuildContent();
    } catch (error) {
      utils.build.failBuild("Failure message", { error });
    }

    console.log("Content rebuild complete.");
  },
};
