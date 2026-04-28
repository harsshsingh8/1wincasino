# 🎰 1Win Casino - React Application

A modern, full-featured online casino and sports betting platform built with React, featuring complete authentication with SMS and email OTP verification.

## ✨ Features

### 🎮 Casino Games
- **Popular Games** - Browse and play trending casino games
- **Live Casino** - Real-time dealer games with live streaming
- **Slots** - Wide variety of slot machines
- **Table Games** - Blackjack, Roulette, Baccarat, Poker
- **Sports Betting** - Bet on live sports with real-time odds

### 🔐 Authentication System
- **Registration with SMS OTP** - Phone verification during signup
- **Login System** - Secure email/password authentication
- **Forgot Password** - Email OTP-based password reset
- **Session Management** - Persistent login with user profiles
- **User Dashboard** - Balance display, deposit, and withdraw

### 💰 Payment Features
- **Deposit Modal** - Multiple payment methods (Card, Crypto, E-Wallet)
- **Withdraw Modal** - Secure withdrawal processing
- **Balance Display** - Real-time balance updates

### 🎁 Promotions
- **Welcome Bonus** - 500% first deposit bonus
- **Weekly Cashback** - 30% cashback on losses
- **Free Spins** - Daily free spins on popular slots
- **VIP Rewards** - Exclusive bonuses for VIP members

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harsshsingh8/1wincasino.git
   cd 1wincasino
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 Testing the App

### Registration Flow
1. Click **"Registration"** button
2. Fill in: Name, Email, Phone, Password
3. Click **"Create Account & Verify"**
4. Check browser console (F12) for OTP
5. Enter OTP in verification modal
6. ✅ Account verified and logged in!

### Login Flow
1. Click **"Login"** button
2. Enter email and password
3. Click **"Login"**
4. ✅ Header shows your name and balance!

### Forgot Password
1. Click **"Login"** → **"Forgot Password?"**
2. Enter registered email
3. Check console for OTP
4. Enter OTP and set new password
5. ✅ Password reset successful!

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router 6
- **Icons:** Lucide React
- **Styling:** Custom CSS with CSS Variables
- **State Management:** React Context API
- **Storage:** localStorage (demo)

## 📧 SMS & Email Integration

### Current Setup (Demo Mode)
- **SMS:** TextBelt API (1 free SMS/day)
- **Email:** Mailto link (opens email client)
- **OTP:** Displayed in browser console for testing

### Production Options

#### SMS Providers
- **Twilio** (Recommended) - $15 free credit
- **TextBelt** - 1 free SMS/day
- **TextNow** - Completely free

#### Email Providers
- **EmailJS** (Recommended) - 200 free emails/month
- **Mailgun** - 5,000 free emails/month
- **SendGrid** - 100 free emails/day

📖 **Full setup guide:** See `AUTH_SETUP.md`

## 📁 Project Structure

```
1wincasino/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navigation header
│   │   ├── Hero.jsx                # Promotional banners
│   │   ├── GameCategories.jsx      # Games grid
│   │   ├── LiveCasino.jsx          # Live dealer games
│   │   ├── SportsBetting.jsx       # Sports odds
│   │   ├── Promotions.jsx          # Bonus offers
│   │   ├── Footer.jsx              # Site footer
│   │   ├── DepositModal.jsx        # Deposit interface
│   │   ├── WithdrawModal.jsx       # Withdrawal interface
│   │   ├── LoginModal.jsx          # Login form
│   │   ├── RegisterModal.jsx       # Registration form
│   │   ├── OTPVerificationModal.jsx # OTP verification
│   │   └── ForgotPasswordModal.jsx  # Password reset
│   ├── context/
│   │   └── AuthContext.jsx         # Authentication logic
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── public/
├── AUTH_SETUP.md                   # SMS/Email setup guide
├── AUTH_COMPLETE.md                # Quick start guide
├── package.json
└── vite.config.js
```

## 🔐 Security Notes

### Current Implementation (Demo)
- ✅ localStorage for user data
- ✅ Console OTP for testing
- ⚠️ Not for production use

### Production Requirements
- Backend API (Node.js, Python, etc.)
- Password hashing (bcrypt)
- JWT tokens for sessions
- Database storage (MongoDB, PostgreSQL)
- Rate limiting
- HTTPS/SSL certificate
- Brute force protection

## 📖 Documentation

- **[AUTH_SETUP.md](AUTH_SETUP.md)** - Complete SMS/Email provider setup
- **[AUTH_COMPLETE.md](AUTH_COMPLETE.md)** - Quick start and testing guide

## 🎯 Features Checklist

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme with animations
- ✅ SMS OTP verification
- ✅ Email OTP for password reset
- ✅ User session management
- ✅ Deposit and withdrawal modals
- ✅ Live casino games
- ✅ Sports betting with odds
- ✅ Promotional banners
- ✅ Game search and filtering
- ✅ Error handling and validation
- ✅ Loading states

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes.

## 📞 Support

For production setup assistance:
- **Twilio:** https://www.twilio.com/docs
- **EmailJS:** https://www.emailjs.com/docs/
- **TextBelt:** https://textbelt.com/

## 🎉 Acknowledgments

- Lucide React for beautiful icons
- Vite for fast development
- React community for amazing tools

---

**Made with ❤️ by [harsshsingh8](https://github.com/harsshsingh8)**

**⚠️ Disclaimer:** This is a demo application for educational purposes. Please gamble responsibly and only use for learning.
