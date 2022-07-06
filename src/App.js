import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import NotFound from "./pages/auth/NotFound";
import MainPage from "./pages/main";
import Planning from "./pages/planning";
import RequireAuth from "./routes/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RequireAuth><MainPage /></RequireAuth>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/planning/*" element={<RequireAuth><Planning /></RequireAuth>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
