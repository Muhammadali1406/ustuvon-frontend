import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Subjects from "./pages/admin/Subjects";
import Tests from "./pages/admin/Tests";
import TestCreate from "./pages/admin/TestCreate";
import Users from "./pages/admin/Users";
import Statistics from "./pages/admin/Statistics";
import Dashboard from "./pages/admin/Dashboard";
import LandingPage from "./pages/landing/landing-pages";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import UserLayout from "./pages/user/user-layout";
import Home from "./pages/user/home";
import UserSubjects from "./pages/user/user-subject";
import UserResults from "./pages/user/user-result";
import UserProfile from "./pages/user/user-profile";
import NotFound from "./pages/not-found";

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

      {/* Foydalanuvchi (user profile) routes with shared layout */}
      <Route path="/app" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="subjects" element={<UserSubjects />} />
        <Route path="results" element={<UserResults />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Mos kelmagan yo'llar */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
