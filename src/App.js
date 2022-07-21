import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import SalesManager from "./pages/sales-manager";
import LoginPage from "./pages/auth/LoginPage";
import NotFound from "./pages/auth/NotFound";
import Planner from "./pages/planner";
import RequireAuth from "./routes/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sales_manager/*" element={<RequireAuth><SalesManager /></RequireAuth>} />
          <Route path="/planner/*" element={<RequireAuth><Planner /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
