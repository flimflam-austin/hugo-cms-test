const csvToHtml = require("./clean.js").csvToHtml;

const configCards1 = Object({
	src: `${__dirname}/rawscrapedata/cardscrape_1.csv`,
	dest: `${__dirname}/rawhtml_cards/`,
	htmlField: "Field1",
	type: "card",
});

const configCards2 = Object({
	src: `${__dirname}/rawscrapedata/cardscrape_2.csv`,
	dest: `${__dirname}/rawhtml_cards/`,
	htmlField: "Field1",
	type: "card",
});

const configArticles = Object({
	src: `${__dirname}/rawscrapedata/articlescrape_1.csv`,
	dest: `${__dirname}/rawhtml_articles/`,
	htmlField: "Field",
	type: "article",
});

csvToHtml(configCards1);
csvToHtml(configCards2);
