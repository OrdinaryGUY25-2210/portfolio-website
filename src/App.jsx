import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DeveloperLogin from './pages/DeveloperLogin'
import DeveloperDashboard from './pages/DeveloperDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/developer" element={<DeveloperLogin />} />
      <Route
        path="/developer/dashboard"
        element={
          <ProtectedRoute>
            <DeveloperDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
