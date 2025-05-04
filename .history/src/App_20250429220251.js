import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminLayout from "./components/layout/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import Statistics from "./pages/admin/Statistics"
import ProductManagement from "./pages/admin/ProductManagement"
import UserManagement from "./pages/admin/UserManagement"
import RoleManagement from "./pages/admin/RoleManagement"
import Login from "./pages/admin/Login"
import ProductCategoryManagement from "./pages/admin/ProductCategoryManagement"
import "./styles/main.scss"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="categories" element={<ProductCategoryManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="roles" element={<RoleManagement />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
