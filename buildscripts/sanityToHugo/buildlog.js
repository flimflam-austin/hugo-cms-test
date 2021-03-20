const fs = require("fs");

const LOG_FILE_NAME = "buildLog.json";

const readBuildLog = () =>
	fs.readFileSync(`${__dirname}/${LOG_FILE_NAME}`, "utf8");

const getLastLog = () => {
	const lastLogData = readBuildLog;

	if (!lastLogData) {
		console.log("No last build log found. Querying all articles.");
	}

	const lastBuildDate = JSON.parse(readBuildLog()).lastbuild;
	console.log(`Last build: ${lastBuildDate}`);

	return lastBuildDate;
};

const logBuild = () => {
	const now = new Date();
	const lastBuild = JSON.stringify({ lastbuild: now });

	fs.writeFileSync(`${__dirname}/${LOG_FILE_NAME}`, lastBuild);

	console.log(`Build log updated to: ${now}`);
};

exports.getLastLog = getLastLog;

exports.logBuild = logBuild;
