import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout"; // Bạn **bị thiếu import** cái này luôn nè!
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import ProductCategoryManagement from "./pages/admin/ProductCategoryManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import RoleManagement from "./pages/admin/RoleManagement";
import Statistics from "./pages/admin/Statistics";
import UserManagement from "./pages/admin/UserManagement";
import CartPage from "./pages/user/CartPage";
import HomePage from "./pages/user/HomePage";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import ProductsPage from "./pages/user/ProductsPage";
import "./styles/main.scss";

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

        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
