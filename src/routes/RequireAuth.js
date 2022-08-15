import NotFound from "pages/auth/NotFound";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkPath } from "utils/index";

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const path = location.pathname.split("/")[1];
	const { isLoggedIn, user } = useSelector((state) => state.auth);

	if (!isLoggedIn || !user || user.token === "") {
		return <Navigate to="/login" state={{ from: location }} replace={true} />;
	} else if (checkPath(user, path)) return children;
	return <NotFound />;
};

export default RequireAuth;
