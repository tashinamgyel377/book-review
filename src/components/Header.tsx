import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="text-xl font-bold text-gray-900 tracking-tight hover:opacity-80 transition cursor-pointer"
            onClick={() => navigate('/')}
          >
            📚 BookReview
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-green-600 to-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-inner">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm text-gray-700 font-medium">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-900 transition"
                >
              
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 text-sm font-medium rounded-md bg-teal-600 text-white hover:bg-teal-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
