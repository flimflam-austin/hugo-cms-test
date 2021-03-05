export const addDot = (text) => `.${text}`;

export const inspect = (value) => {
	console.group(`|-inspecting--------------`);
	console.log(value);
	console.log("\n");
	console.groupEnd();
	return value;
};
