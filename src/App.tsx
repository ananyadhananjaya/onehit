import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
