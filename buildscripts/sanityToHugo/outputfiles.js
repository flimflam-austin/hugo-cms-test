const fsextra = require("fs-extra");
const ff = require("./ffhelpers");
const fetch = require("node-fetch");

const getImageNameFromUrl = (imageUrl) =>
	imageUrl.match(/([^?\/]+)(?=\?|$)/)[0];

const replaceImageUrls = (bodyText) => {
	const imageUrls = bodyText.match(
		/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
	);

	const uniqueUrls = imageUrls
		? imageUrls.filter(ff.filterUniqueValues)
		: null;

	let relinkedMarkdown = "";

	if (uniqueUrls) {
		let newBodyText = bodyText;
		uniqueUrls.forEach((url) => {
			newBodyText = newBodyText.replace(url, getImageNameFromUrl(url));
		});

		relinkedMarkdown = newBodyText;
	} else {
		relinkedMarkdown = bodyText;
	}

	return Object.freeze({
		relinkedMarkdown: relinkedMarkdown,
		imageUrls: imageUrls,
	});
};

const writeFile = (dataObj) => {
	/* console.log('Data to write:');
	console.log(dataObj); */
	const { type, markdown, slug } = dataObj;

	const { relinkedMarkdown, imageUrls } = replaceImageUrls(markdown);

	// TODO: better path resolution
	const outputPath = `${__dirname}/../../site/content/${type}/${slug}`;

	fsextra.outputFile(`${outputPath}/index.md`, relinkedMarkdown, (err) => {
		if (err) {
			console.log(`Failed to write file with slug ${type}/${slug}. =(`);
			return null;
		}

		console.log(`File written or updated ${slug}`);

		if (imageUrls) {
			imageUrls.forEach(async (imageUrl) => {
				const path = `${outputPath}/${getImageNameFromUrl(imageUrl)}`;
				return await fsextra.pathExists(path, async (err, exists) => {
					if (err) {
						console.log(
							`Failed to check if file exists at: ${path}`
						);
						return null;
					}

					if (exists) {
						console.log(
							`Image already exists with the path: ${path}`
						);
						return null;
					}

					const response = await fetch(imageUrl)
						.then((response) => {
							return response;
						})
						.catch((err) => {
							console.log(
								`=( Error fetching image with path: ${imageUrl}`
							);
							return null;
						});

					if (!response) {
						return null;
					}

					const buffer = await response.buffer();
					return await fsextra.outputFile(path, buffer, (err) => {
						if (err) {
							console.error(
								`Failed to download image '${imageUrl}' =(`
							);
							return null;
						}
						console.log(`Image '${imageUrl}' written =)`);
						return;
					});
				});
			});
		}
	});
};

const writeFiles = (dataForFiles) =>
	dataForFiles.map(async (data) => await writeFile(data));

module.exports = writeFiles;
