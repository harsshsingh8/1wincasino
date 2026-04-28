import { useState } from 'react'
import { Menu, X, User, Wallet, Gift, Headphones, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Header.css'

function Header({ onDeposit, onWithdraw, onLogin, onRegister }) {
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="logo">
            <h1>1WIN</h1>
          </div>
          <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="/" className="nav-link active">Home</a>
            <a href="/slots" className="nav-link">Slots</a>
            <a href="/live-casino" className="nav-link">Live Casino</a>
            <a href="/sports" className="nav-link">Sports</a>
            <a href="/promotions" className="nav-link">Promotions</a>
          </nav>
        </div>

        <div className="header-right">
          {isAuthenticated ? (
            <>
              <button className="btn btn-deposit" onClick={onDeposit}>
                <Wallet size={18} />
                <span>Deposit</span>
              </button>
              <button className="btn btn-withdraw" onClick={onWithdraw}>
                Withdraw
              </button>
              <div className="user-balance">
                <span className="balance-amount">${(user?.balance || 0).toFixed(2)}</span>
              </div>
              <div className="user-menu">
                <button className="btn btn-user">
                  <User size={20} />
                  <span>{user?.name || 'User'}</span>
                </button>
                <button className="btn btn-logout" onClick={logout}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="btn btn-login" onClick={onLogin}>
                Login
              </button>
              <button className="btn btn-register" onClick={onRegister}>
                Registration
              </button>
            </>
          )}
          
          <button className="btn btn-icon" title="Support">
            <Headphones size={20} />
          </button>
          <button className="btn btn-icon" title="Promotions">
            <Gift size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
