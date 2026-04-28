import { X, Shield, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './Modal.css'

function OTPVerificationModal({ isOpen, onClose }) {
  const { verifyOTP } = useAuth()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(600) // 10 minutes

  useEffect(() => {
    if (timer > 0 && isOpen) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer, isOpen])

  if (!isOpen) return null

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const otpCode = otp.join('')
    
    if (otpCode.length !== 6) {
      setError('Please enter complete OTP')
      return
    }

    setLoading(true)
    const result = await verifyOTP(otpCode)
    setLoading(false)

    if (result.success) {
      onClose()
      // Show success message
      alert('Account verified successfully! You can now login.')
    } else {
      setError(result.message)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content otp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <div className="otp-icon">
            <Shield size={48} />
          </div>
          <h2>Verify Your Account</h2>
          <p>Enter the 6-digit OTP sent to your phone</p>
        </div>

        <div className="modal-body">
          <form className="otp-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="timer-display">
              <span>Time remaining: {formatTime(timer)}</span>
            </div>

            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button type="submit" className="btn-verify-otp" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>

            <div className="otp-actions">
              <button 
                type="button" 
                className="btn-resend-otp"
                disabled={timer > 0}
                onClick={() => setTimer(600)}
              >
                <RefreshCw size={16} />
                {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : 'Resend OTP'}
              </button>
            </div>

            <div className="otp-info">
              <p>📱 Check your phone for the verification code</p>
              <p className="demo-note">Demo: Check browser console for OTP</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OTPVerificationModal
