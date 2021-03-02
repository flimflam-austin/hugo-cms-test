import { truncateString } from "./truncate";

export const initBreakingDropdown = () => {
	console.log(`1`);
	console.log(truncateString("purple", 10, 5));
	console.log(`2`);
	console.log(truncateString("purple", 5, 10));
	console.log(`3`);
	console.log(truncateString("the purple dog.", 14, 1));
	console.log(`4`);
	console.log(truncateString("1234 67890", 9, 10));
	console.log(`5`);
	console.log(truncateString(["a", "b"], 9, 2));
};
