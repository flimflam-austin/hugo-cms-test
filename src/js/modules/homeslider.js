const Flickity = require("flickity");
//require("flickity-imagesloaded");

export const initHomeSlider = () => {
	const flkty = new Flickity(".carousel", {
		//imagesLoaded: true,
		wrapAround: true,
		setGallerySize: false,
		lazyLoad: 2,
	});
};
