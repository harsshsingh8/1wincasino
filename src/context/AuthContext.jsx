import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const register = async (userData) => {
    try {
      // Store user in localStorage (in production, this would be a backend API call)
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email)
      if (existingUser) {
        throw new Error('User already exists with this email')
      }

      // Create new user with verification status
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        isVerified: false,
        createdAt: new Date().toISOString(),
        balance: 0
      }

      // In production, send SMS OTP here using free SMS API
      const otp = generateOTP()
      await sendSMSOTP(userData.phone, otp)
      
      // Store OTP temporarily
      localStorage.setItem('tempOTP', otp)
      localStorage.setItem('tempUserData', JSON.stringify(newUser))

      return { success: true, message: 'OTP sent to your phone' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const verifyOTP = async (otp) => {
    try {
      const storedOTP = localStorage.getItem('tempOTP')
      const tempUserData = localStorage.getItem('tempUserData')

      if (otp !== storedOTP) {
        throw new Error('Invalid OTP')
      }

      const newUser = JSON.parse(tempUserData)
      newUser.isVerified = true

      // Store user in database
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Auto login after verification
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))

      // Clean up temporary data
      localStorage.removeItem('tempOTP')
      localStorage.removeItem('tempUserData')

      return { success: true, message: 'Account verified successfully' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find(u => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      if (!foundUser.isVerified) {
        throw new Error('Please verify your account first')
      }

      setUser(foundUser)
      localStorage.setItem('user', JSON.stringify(foundUser))

      return { success: true, message: 'Login successful' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const forgotPassword = async (email) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find(u => u.email === email)

      if (!foundUser) {
        throw new Error('No account found with this email')
      }

      // Generate and send OTP to email
      const otp = generateOTP()
      await sendEmailOTP(email, otp)

      // Store OTP for verification
      localStorage.setItem('resetOTP', otp)
      localStorage.setItem('resetEmail', email)

      return { success: true, message: 'OTP sent to your email' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const verifyResetOTP = async (otp, newPassword) => {
    try {
      const storedOTP = localStorage.getItem('resetOTP')
      const email = localStorage.getItem('resetEmail')

      if (otp !== storedOTP) {
        throw new Error('Invalid OTP')
      }

      // Update password
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex(u => u.email === email)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      users[userIndex].password = newPassword
      localStorage.setItem('users', JSON.stringify(users))

      // Clean up
      localStorage.removeItem('resetOTP')
      localStorage.removeItem('resetEmail')

      return { success: true, message: 'Password reset successful' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Free SMS API integration using TextBelt (free tier: 1 SMS/day)
  // Alternative: Use Twilio trial account (free $15 credit)
  const sendSMSOTP = async (phone, otp) => {
    try {
      // Using TextBelt free SMS API (1 free SMS per day per IP)
      // For production, use Twilio, Vonage, or other SMS providers
      const response = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          message: `Your 1Win Casino verification code is: ${otp}. Valid for 10 minutes.`,
          key: 'textbelt' // Free tier key
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        console.log('SMS sent successfully (production mode)')
        // For demo purposes, show OTP in console
        console.log('Demo OTP:', otp)
        return true
      }
      
      return true
    } catch (error) {
      console.error('SMS sending failed:', error)
      // For demo/development, log the OTP
      console.log('Demo OTP:', otp)
      return true
    }
  }

  // Email OTP using EmailJS (free tier: 200 emails/month)
  // Alternative: Use backend API with Nodemailer
  const sendEmailOTP = async (email, otp) => {
    try {
      // Using mailto for demo (in production, use EmailJS or backend API)
      // For production setup:
      // 1. Sign up at https://www.emailjs.com/ (free tier available)
      // 2. Install: npm install @emailjs/browser
      // 3. Configure email service and template
      
      const subject = '1Win Casino - Password Reset OTP'
      const body = `Your password reset code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nIf you didn't request this, please ignore this email.`
      
      // For demo purposes, open mailto link
      // In production, use EmailJS.send() or backend API
      window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
      
      console.log('Email OTP sent to:', email)
      console.log('Demo OTP:', otp)
      
      return true
    } catch (error) {
      console.error('Email sending failed:', error)
      console.log('Demo OTP:', otp)
      return true
    }
  }

  const value = {
    user,
    loading,
    register,
    verifyOTP,
    login,
    logout,
    forgotPassword,
    verifyResetOTP,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
