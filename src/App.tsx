import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage'
import { LoginForm } from './pages/LoginPage'
import Navbar from './components/Navbar'
import MenuPage from './pages/MenuPage'
import { SignUpPage } from './pages/SignupPage'
import useAuth from './context/AuthContext'
import { useEffect } from 'react'
import api from './api/axios'

function App() {
  const { setUser } = useAuth();
  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.data.user);
      } catch {
        setUser(null);
      }
    }

    fetchProfile();
  }, [setUser]);
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
