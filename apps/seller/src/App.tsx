import { Routes, Route, Navigate } from 'react-router-dom'
import SellerLogin from './pages/SellerLogin'
import OrganizationOnboarding from './pages/OrganizationOnboarding'
import ShopOnboarding from './pages/ShopOnboarding'
import ShopDashboard from './pages/ShopDashboard'
import ProductManagement from './pages/ProductManagement'
import ProductForm from './pages/ProductForm'
import DesignSystem from './pages/DesignSystem'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/seller/login" replace />} />
      <Route path="/design" element={<DesignSystem />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/seller/onboarding/org" element={<OrganizationOnboarding />} />
      <Route path="/seller/onboarding/shop" element={<ShopOnboarding />} />
      <Route path="/seller/shop/:shopId" element={<ShopDashboard />} />
      <Route path="/seller/shop/:shopId/products" element={<ProductManagement />} />
      <Route path="/seller/shop/:shopId/products/:productId" element={<ProductForm />} />
      <Route path="/seller/shops" element={<div>Shop Selector (Coming Soon)</div>} />
    </Routes>
  )
}

export default App

