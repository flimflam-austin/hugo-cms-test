// https://www.sanity.io/guides/sanity-and-hugo-with-netlify-plugins
const fs = require("fs-extra");

const updateDeployLog = () => {
	const deployLogPath = "./plugins/netlify-sanity-md/deploylog.json";
	const deployLog = JSON.parse(fs.readFileSync(deployLogPath, "utf8"));
	const lastDeploy = Date.parse(deployLog.lastBuild);
	const currentTime = new Date();

	deployLog.lastBuild = currentTime;

	fs.writeFileSync(deployLogPath, JSON.stringify(deployLog), "utf8");

	return lastDeploy;
};

module.exports = {
	onPreBuild: async ({ utils, packageJson }) => {
		console.log("Starting plugin");
		//imports

		const toMarkdown = require("@sanity/block-content-to-markdown");
		const client = require("@sanity/client")({
			projectId: "zhir6k5d",
			dataset: "public",
			useCdn: false,
		});

		const lastBuildTime = updateDeployLog();

		console.log(lastBuildTime);
		//add any serializers for your portable text
		/* const serializers = {
			types: {
				code: (props) =>
					"```" +
					props.node.language +
					"\n" +
					props.node.code +
					"\n```",
			},
		};

		fs.readdir("./content", (err, files) => {
			if (err) console.log(err);
			else {
				files.forEach((file) => {
					console.log(`Deleting: ${file}`);
					fs.unlink(`content//${file}`, (err) => {
						if (err) throw err;
					});
				});
			}
		}); */

		try {
			/* await client.fetch(`*[_type == "quickquotes"]{title}`).then((res) =>
				res.map(async (post) => {
					console.log(post); */
			//console.log(fs.readdirSync("./"));
			//output YAML frontmatter here
			/* let frontmatter = "---";
						Object.keys(post).forEach((field) => {
							if (field === "slug") {
								return (frontmatter += `\n${field}: "${post.slug.current}"`);
							} else if (field === "categories") {
								return (frontmatter += `\n${field}: [${post.categories.map(
									(cat) => `"${cat.title}"`
								)}]`);
							} else if (field === "body") {
								return;
							} else {
								frontmatter += `\n${field}: "${post[field]}"`;
							}
						});
						frontmatter += "\n---\n\n";

						const wholePost = `${frontmatter}${toMarkdown(
							post.body,
							{
								serializers,
							}
						)}`;

						const filePath = `./content/${post.slug.current}.md`;
						fs.outputFile(
							filePath,
							wholePost,
							function (err, data) {
								if (err) {
									return console.log(err);
								}
							}
						); */
			/* })
			); */
		} catch (error) {
			utils.build.failBuild("Failure message", { error });
		}
	},
};
