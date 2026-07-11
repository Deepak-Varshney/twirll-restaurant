import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner.tsx"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <App />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
