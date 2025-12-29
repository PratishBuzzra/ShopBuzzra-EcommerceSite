import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import About from './Pages/About'
import Shop from './Pages/Shop'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CheckOutPage from './Pages/CheckOutPage'
import Unauthorized from './Pages/Unauthorized'

import AdminRoutes from './Routes/AdminRoutes'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import PublicLayout from './components/PublicLayout'
import EsewaSuccess from './components/Esewa/EsewaSuccess'
import EsewaFail from './components/Esewa/EsewaFail'
import OrdersPage from './components/Esewa/order'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
           <Route path="/success" element={<EsewaSuccess />} />
           <Route path="/orders" element={<OrdersPage />} />
        <Route path="/failure" element={<EsewaFail />} />
        </Route>

      
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
