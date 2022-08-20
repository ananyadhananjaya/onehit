import { Routes, Route } from 'react-router-dom'
import FooterComponent from './components/FooterComponent'
import EditPage from './Pages/EditPage'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import PageNotFound from './Pages/PageNotFound'
import PublicPage from './Pages/PublicPage'
import SignUpPage from './Pages/SignUpPage'

function App() {
  return (
    <div className="bg-blue-50 max-h-content relative">
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onehit" element={<MainPage />} />
          <Route path="/editUser" element={<EditPage />} />
          <Route path="/onehit/:userId" element={<PublicPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
