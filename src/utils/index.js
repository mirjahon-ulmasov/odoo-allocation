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

export const checkCount = (num1, num2) => {
  	return num1 === num2 
	? "success-font" 
	: num1 > num2 
	? "warning-font" 
	: "danger-font";
};

export const getStatusOrder = (status) => {
	switch(status) {
		case '1':
			return 'Valid';
		case '2':
			return 'Pending';
		case '3':
			return 'Completed';
		default:
			return 'Fail';
	}
}