import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './Context/CartContext.jsx'
import { AuthProvider } from './Context/authContext.jsx'
import ProductProvider from './Context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
 <CartProvider>
    <ProductProvider>
    <App />
    </ProductProvider>
  </CartProvider>
    </AuthProvider>
 
)
