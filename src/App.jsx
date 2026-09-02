import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DeveloperLogin from './pages/DeveloperLogin'
import DeveloperDashboard from './pages/DeveloperDashboard'
import DynamicPage from './pages/DynamicPage'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeProvider from './components/ThemeProvider'
import { useSiteContent } from './lib/useSiteContent'

export default function App() {
  const site = useSiteContent()

  return (
    <ThemeProvider theme={site.content.theme}>
      <Routes>
        <Route path="/" element={<Home site={site} />} />
        <Route path="/developer" element={<DeveloperLogin />} />
        <Route
          path="/developer/dashboard"
          element={
            <ProtectedRoute>
              <DeveloperDashboard site={site} />
            </ProtectedRoute>
          }
        />
        <Route path="/:slug" element={<DynamicPage site={site} />} />
      </Routes>
    </ThemeProvider>
  )
}
