import { Shield, CreditCard, Headphones, Award, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-section">
            <div className="footer-logo">
              <h2>1WIN</h2>
            </div>
            <p className="footer-description">
              Your trusted online casino and sports betting platform. 
              Experience the best games with secure transactions and 24/7 support.
            </p>
            <div className="payment-methods">
              <div className="payment-icon">💳</div>
              <div className="payment-icon">₿</div>
              <div className="payment-icon">💵</div>
              <div className="payment-icon">🏦</div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/responsible">Responsible Gaming</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Games</h3>
            <ul className="footer-links">
              <li><a href="/slots">Slots</a></li>
              <li><a href="/live-casino">Live Casino</a></li>
              <li><a href="/table-games">Table Games</a></li>
              <li><a href="/sports">Sports Betting</a></li>
              <li><a href="/jackpots">Jackpots</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <Mail size={18} />
                <span>support@1win.com</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+1 (800) 123-4567</span>
              </li>
              <li>
                <Headphones size={18} />
                <span>24/7 Live Chat</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>Curacao, Netherlands Antilles</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-middle">
          <div className="trust-badges">
            <div className="badge">
              <Shield size={24} />
              <span>SSL Secured</span>
            </div>
            <div className="badge">
              <Award size={24} />
              <span>Licensed</span>
            </div>
            <div className="badge">
              <CreditCard size={24} />
              <span>Secure Payments</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>© 2026 1Win Casino. All rights reserved.</p>
            <p className="age-restriction">18+ | Gamble Responsibly</p>
          </div>
          <div className="licensing-info">
            <p>
              Licensed and regulated by the Government of Curacao. 
              This website operates under License No. 8048/JAZ.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
