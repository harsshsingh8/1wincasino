import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './Modal.css'

function ForgotPasswordModal({ isOpen, onClose }) {
  const { forgotPassword, verifyResetOTP } = useAuth()
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(600)

  useEffect(() => {
    if (timer > 0 && isOpen) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer, isOpen])

  if (!isOpen) return null

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await forgotPassword(email)
    setLoading(false)

    if (result.success) {
      setStep(2)
      setTimer(600)
    } else {
      setError(result.message)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError('')

    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      setError('Please enter complete OTP')
      return
    }

    setStep(3)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    const otpCode = otp.join('')
    const result = await verifyResetOTP(otpCode, newPassword)
    setLoading(false)

    if (result.success) {
      alert('Password reset successful! Please login with your new password.')
      onClose()
      // Reset form
      setStep(1)
      setEmail('')
      setOtp(['', '', '', '', '', ''])
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setError(result.message)
    }
  }

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Verify OTP'}
            {step === 3 && 'Reset Password'}
          </h2>
          <p>
            {step === 1 && 'Enter your email to receive OTP'}
            {step === 2 && 'Enter the OTP sent to your email'}
            {step === 3 && 'Create a new password'}
          </p>
        </div>

        <div className="modal-body">
          {step === 1 && (
            <form className="auth-form" onSubmit={handleSendOTP}>
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} />
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit-login" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <div className="otp-info">
                <p>📧 OTP will be sent to your email address</p>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="otp-form" onSubmit={handleVerifyOTP}>
              {error && <div className="error-message">{error}</div>}

              <div className="timer-display">
                <span>Time remaining: {formatTime(timer)}</span>
              </div>

              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`reset-otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    className="otp-input"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <button type="submit" className="btn-verify-otp">
                Verify OTP
              </button>

              <div className="otp-actions">
                <button 
                  type="button" 
                  className="btn-resend-otp"
                  disabled={timer > 0}
                  onClick={() => {
                    handleSendOTP({ preventDefault: () => {} })
                  }}
                >
                  {timer > 0 ? `Resend in ${formatTime(timer)}` : 'Resend OTP'}
                </button>
              </div>

              <div className="otp-info">
                <p>📧 Check your email for the verification code</p>
                <p className="demo-note">Demo: Check browser console for OTP</p>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="auth-form" onSubmit={handleResetPassword}>
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label>New Password</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit-login" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
