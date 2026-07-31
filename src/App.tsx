import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Subjects from "./pages/admin/Subjects";
import Tests from "./pages/admin/Tests";
import TestCreate from "./pages/admin/TestCreate";
import Users from "./pages/admin/Users";
import Statistics from "./pages/admin/Statistics";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Routes>
      {/* Admin routes with shared layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="tests" element={<Tests />} />
        <Route path="tests/create" element={<TestCreate />} />
        <Route path="users" element={<Users />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
    </Routes>
  );
}

export default App;
