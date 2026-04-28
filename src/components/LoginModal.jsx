import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Modal.css'

function LoginModal({ isOpen, onClose, onForgotPassword }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)
    
    setLoading(false)

    if (result.success) {
      onClose()
    } else {
      setError(result.message)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        <div className="modal-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-link" onClick={onForgotPassword}>Forgot Password?</button>
            </div>

            <button type="submit" className="btn-submit-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button type="button" className="btn-social-login">
              <span role="img" aria-label="google">🔍</span>
              Continue with Google
            </button>

            <p className="auth-switch">
              Don't have an account? <button type="button" onClick={onClose}>Sign Up</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
