export const getPath = (user = null) => {
	if (!user) return "/login";
	else if (user.role === "sales_manager") return "/sm";
	return `/${user.role}`;
};

export const checkPath = (user = null, path) => {
	let role = path === "sm" ? "sales_manager" : path;
	if (!user) return false;
	else if (user.role === role) return true;
	return false;
};

export const getStatus = (processed) => {
	return processed ? "confirmed" : "pending";
};
