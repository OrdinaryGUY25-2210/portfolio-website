import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, checking } = useAuth()

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <p className="eyebrow uppercase text-mute">Memuat…</p>
      </div>
    )
  }

  if (!session) return <Navigate to="/developer" replace />

  return children
}
