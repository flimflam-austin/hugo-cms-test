const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const csvParser = require("csv-parser");
const beautify = require("js-beautify").js;
const urlize = require("urlize").urlize;
const cardToJson = require("./jsonbuilder.js").processCardsToJSON;

const processHtml = (domHTML) => {
	const scripts = domHTML.window.document.querySelectorAll("script");
	const footer = domHTML.window.document.querySelectorAll("footer");
	const styles = domHTML.window.document.querySelectorAll("style");
	const navs = domHTML.window.document.querySelectorAll("nav");
	const links = [...domHTML.window.document.querySelectorAll("link")].filter(
		(link) => link.rel === "stylesheet"
	);

	const toRemove = [...scripts, ...footer, ...styles, ...navs, ...links];
	toRemove.forEach((removable) => {
		removable.parentNode.removeChild(removable);
	});

	return domHTML;
};

exports.csvToHtml = (inputConfig) => {
	const filepath = inputConfig.src;
	const destinationFolder = inputConfig.dest;
	const htmlFieldName = inputConfig.htmlField;
	const inputType = inputConfig.type;

	fs.createReadStream(filepath)
		.on("error", () => {
			// handle error
			console.error(error);
		})
		.pipe(csvParser())
		.on("data", (row) => {
			// use row data
			const dom = new JSDOM(row[htmlFieldName]);
			if (dom) {
				const metas = dom.window.document.querySelectorAll("meta");
				let publishDate;
				if (metas) {
					metas.forEach((meta) => {
						const filename = dom.window.document.querySelector("title")
							.innerHTML;
						const maybeYear = `${filename[0]}${filename[1]}`; //YYMMDD
						const maybeYear2 = `${filename[0]}${filename[1]}${filename[2]}${filename[3]}`; //YYYYMMDD
						const maybeYear3 = `${filename[4]}${filename[5]}`; //MMDDYY
						const isOld =
							maybeYear === "17" ||
							maybeYear === "18" ||
							maybeYear === "19" ||
							maybeYear2 === "2018" ||
							maybeYear3 === "18"
								? true
								: false;

						if (isOld) {
							console.log("skipping: file too old");
						} else {
							const fullFilename = `${destinationFolder}${urlize(
								filename
							)}.html`;
							const output = processHtml(dom).serialize();

							fs.writeFile(fullFilename, output, (err) => {
								console.error(err);
							});

							console.log(`wrote file: ${filename}`);
						}
					});
				} else {
					console.log(`skipping: no meta found.`);
				}
			} else {
				console.log(`skipping: no dom found.`);
			}
			console.log("----------------------------------");
		})

		.on("end", () => {
			// handle end of CSV
			console.log(`- ending processing.`);
		});
};
