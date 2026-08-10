import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Subjects from "./pages/admin/Subjects";
import Tests from "./pages/admin/Tests";
import TestCreate from "./pages/admin/TestCreate";
import Users from "./pages/admin/Users";
import Statistics from "./pages/admin/Statistics";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/not-found";
import LandingPage from "./pages/landing/landing-pages";
import Register from "./pages/register/register";
import Login from "./pages/login/login";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin routes with shared layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="tests" element={<Tests />} />
        <Route path="tests/create" element={<TestCreate />} />
        <Route path="users" element={<Users />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>

      {/* Mos kelmagan yo'llar */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
