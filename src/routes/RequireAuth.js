import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn || !token || token === "") {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
  return children;
};

export default RequireAuth;
