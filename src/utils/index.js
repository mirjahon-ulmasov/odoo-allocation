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

export const getStatusEn = (status) => {
  return status === 1 ? "pending" 
  : status === 2 ? "confirmed" 
  : "rejected";
};

export const getStatusRu = (status) => {
  return status === 1 ? "в ожидании" 
  : status === 2 ? "подтвержденный" 
  : "отклоненный";
};

