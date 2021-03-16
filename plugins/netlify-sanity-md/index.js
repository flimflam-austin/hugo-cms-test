// https://www.sanity.io/guides/sanity-and-hugo-with-netlify-plugins

module.exports = {
	onPreBuild: async ({ utils, packageJson }) => {
		console.log("Starting plugin");
		//imports
		const fs = require("fs-extra");
		const toMarkdown = require("@sanity/block-content-to-markdown");
		const client = require("@sanity/client")({
			projectId: "YOUR_PROJECT_ID_HERE",
			dataset: "YOUR_DATASET_HERE",
			useCdn: false,
		});

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
			await client.fetch(`*[_type == "quickquotes"]{title}`).then((res) =>
				res.map(async (post) => {
					console.log(post);

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
				})
			);
		} catch (error) {
			utils.build.failBuild("Failure message", { error });
		}
	},
};
