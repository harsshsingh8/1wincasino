import { X, CreditCard, Wallet, DollarSign } from 'lucide-react'
import { useState } from 'react'
import './Modal.css'

function WithdrawModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')

  if (!isOpen) return null

  const presetAmounts = [50, 100, 250, 500, 1000]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>Withdraw Funds</h2>
          <p>Withdraw money from your account</p>
        </div>

        <div className="modal-body">
          <div className="balance-display">
            <p>Available Balance</p>
            <h3>$1,234.56</h3>
          </div>

          <div className="payment-methods">
            <button 
              className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard size={24} />
              <span>Card</span>
            </button>
            <button 
              className={`payment-method ${paymentMethod === 'crypto' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('crypto')}
            >
              <Wallet size={24} />
              <span>Crypto</span>
            </button>
            <button 
              className={`payment-method ${paymentMethod === 'ewallet' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('ewallet')}
            >
              <DollarSign size={24} />
              <span>E-Wallet</span>
            </button>
          </div>

          <div className="amount-section">
            <label>Withdrawal Amount</label>
            <div className="preset-amounts">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  className={`preset-btn ${amount === preset.toString() ? 'active' : ''}`}
                  onClick={() => setAmount(preset.toString())}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <div className="custom-amount">
              <span className="currency">$</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="withdrawal-info">
            <p>⏱️ Processing time: 24-48 hours</p>
          </div>

          <button className="btn-submit-withdraw">
            Withdraw Now
          </button>

          <div className="secure-note">
            <p>🔒 Secure transaction with SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithdrawModal
