import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import RequireAuth from "routes/RequireAuth";
import SalesManager from "pages/sales-manager";
import LoginPage from "pages/auth/LoginPage";
import NotFound from "pages/auth/NotFound";
import Planner from "pages/planner";
import { getPath } from "services/setting";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(state => state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to={getPath(user)}/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sm/*" element={<RequireAuth><SalesManager /></RequireAuth>} />
          <Route path="/planner/*" element={<RequireAuth><Planner /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
