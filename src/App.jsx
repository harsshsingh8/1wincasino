import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import GameCategories from './components/GameCategories'
import LiveCasino from './components/LiveCasino'
import SportsBetting from './components/SportsBetting'
import Promotions from './components/Promotions'
import Footer from './components/Footer'
import DepositModal from './components/DepositModal'
import WithdrawModal from './components/WithdrawModal'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import OTPVerificationModal from './components/OTPVerificationModal'
import ForgotPasswordModal from './components/ForgotPasswordModal'

function App() {
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showOTPVerification, setShowOTPVerification] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header 
            onDeposit={() => setShowDeposit(true)}
            onWithdraw={() => setShowWithdraw(true)}
            onLogin={() => setShowLogin(true)}
            onRegister={() => setShowRegister(true)}
          />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <GameCategories />
                <LiveCasino />
                <SportsBetting />
                <Promotions />
              </>
            } />
          </Routes>
          
          <Footer />

          <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
          <WithdrawModal isOpen={showWithdraw} onClose={() => setShowWithdraw(false)} />
          <LoginModal 
            isOpen={showLogin} 
            onClose={() => setShowLogin(false)}
            onForgotPassword={() => {
              setShowLogin(false)
              setShowForgotPassword(true)
            }}
          />
          <RegisterModal 
            isOpen={showRegister} 
            onClose={() => setShowRegister(false)}
            onSuccess={() => {
              setShowRegister(false)
              setShowOTPVerification(true)
            }}
          />
          <OTPVerificationModal 
            isOpen={showOTPVerification} 
            onClose={() => setShowOTPVerification(false)}
          />
          <ForgotPasswordModal 
            isOpen={showForgotPassword} 
            onClose={() => setShowForgotPassword(false)}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
