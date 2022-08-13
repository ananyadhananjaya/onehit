import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'

function App() {
  return (
    <div className="h-screen bg-blue-50">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/onehit" element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App
