const Flickity = require("flickity");
//require("flickity-imagesloaded");

export const initHomeSlider = () => {
	const carouselClass = ".carousel";
	if (!document.querySelector(carouselClass)) return null;

	const flkty = new Flickity(carouselClass, {
		//imagesLoaded: true,
		wrapAround: true,
		setGallerySize: false,
		lazyLoad: 2,
	});
};
