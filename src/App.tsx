import Spline from '@splinetool/react-spline'
import { Routes, Route } from 'react-router-dom'
import FooterComponent from './components/FooterComponent'
import EditPage from './Pages/EditPage'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import PageNotFound from './Pages/PageNotFound'
import SignUpPage from './Pages/SignUpPage'

function App() {
  return (
    <div className="bg-blue-50 h-screen relative">
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onehit" element={<MainPage />} />
          <Route path="/editUser" element={<EditPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <div className="flex justify-center">
        <FooterComponent />
      </div>
    </div>
  )
}

export default App
