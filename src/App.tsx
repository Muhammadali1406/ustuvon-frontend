import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import Subjects from "./pages/admin/Subjects";
import Tests from "./pages/admin/Tests";
import Users from "./pages/admin/Users";
import Statistics from "./pages/admin/Statistics";
import Dashboard from "./pages/admin/Dashboard";
import LandingPage from "./pages/landing/landing-pages";
import LoginPage from "./widgets/login/ui/login-page";
import RegisterPage from "./widgets/register/ui/register-page";
import PasswordResetPage from "./widgets/reset-pasword/ui/paswordResetPage";
import { GuestRoute } from "./components/layout/Guestroute";
import { ProtectedRoute } from "./components/layout/Protectedroute";
// import Home from "./pages/user/home";
import UserSubjects from "./pages/user/user-subject";
import SubjectDetail from "./pages/user/user-subject-detail";
import TestRules from "./pages/user/test-rule";
import UserProfile from "./pages/user/user-profile";
import TestRun from "./pages/user/test-run";
import UserResults from "./pages/user/user-result";
import NotFound from "./pages/not-found";
import DemoPage from "./pages/demo/demo-page";

function App() {
  return (
    <Routes>
      {/* Ommaviy */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<DemoPage />} />

      {/* Faqat kirmagan foydalanuvchi uchun — kirgan bo'lsa o'z bosh
          sahifasiga qaytariladi (GuestRoute) */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/password-reset"
        element={
          <GuestRoute>
            <PasswordResetPage />
          </GuestRoute>
        }
      />

      {/* Admin — faqat user_type === "admin" kira oladi */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedUserTypes={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="tests" element={<Tests />} />
        <Route path="users" element={<Users />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>

      {/* Foydalanuvchi — tizimga kirgan istalgan kishi (rol farqi yo'q) */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        {/* <Route index element={<Home />} /> */}
        <Route index element={<Navigate to="subjects" replace />} />
        <Route index path="subjects" element={<UserSubjects />} />
        <Route path="subjects/:subjectId" element={<SubjectDetail />} />
        <Route
          path="subjects/:subjectId/tests/:testId"
          element={<TestRules />}
        />
        <Route
          path="subjects/:subjectId/tests/:testId/run"
          element={<TestRun />}
        />
        <Route path="results" element={<UserResults />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Mos kelmagan yo'llar */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
