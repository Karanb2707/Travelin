import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ExploreBuses from "./pages/ExploreBuses";
import MyTrips from "./pages/MyTrips";
import Payments from "./pages/Payments";
import Support from "./pages/Support";
import Profile from "./pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* Authenticated routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreBuses />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
