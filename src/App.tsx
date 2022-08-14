import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import PageNotFound from './Pages/PageNotFound'
import SignUpPage from './Pages/SignUpPage'

function App() {
  return (
    <div className="h-screen bg-blue-50">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onehit" element={<MainPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
