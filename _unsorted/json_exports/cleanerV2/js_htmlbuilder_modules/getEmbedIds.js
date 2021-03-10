const getYoutubeId = (url) => {
	let ID = "";
	url = url
		.replace(/(>|<)/gi, "")
		.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	if (url[2] !== undefined) {
		ID = url[2].split(/[^0-9a-z_\-]/i);
		ID = ID[0];
	} else {
		ID = url;
	}
	return ID;
};

const getInstagramId = (url) => {
	const match = url.match(/(?<=(tv|p)\/)(.*)(?=\/embed)/);
	return match ? match[0] : null;
};

const getTweetId = (embed) => embed.dataset.tweetId;

exports.getBody = (dom, bodyClass = ".article-post") => {
	const body = dom.window.document.querySelector(bodyClass);

	//console.log(body);
	const embeds = !!body ? body.querySelectorAll("iframe") : null;
	if (embeds) {
		embeds.forEach((embed) => {
			const source = embed.src;

			let embedId;
			const tempDiv = dom.window.document.createElement("div");

			if (source.match(/youtu/g)) {
				const embedId = getYoutubeId(source);

				tempDiv.innerHTML = `{{< youtube ${embedId} >}}`;
			}

			if (source.match(/instag/g)) {
				const embedId = getInstagramId(source);

				tempDiv.innerHTML = embedId
					? `<a href="https://www.instagram.com/tv/${embedId}/">Click here</a> learn more on instagram.`
					: "";
			}

			if (source.match(/twitter/g)) {
				const embedId = getTweetId(embed);

				tempDiv.innerHTML = `{{< tweet ${embedId} >}}`;
			}

			embed.insertAdjacentElement("afterend", tempDiv);
			console.log(body.innerHTML);
		});
	}

	return body.innerHTML;
};
