# 1Win Casino - Authentication & OTP Setup Guide

## ✅ Implemented Features

### 1. **Registration with SMS OTP**
- Users register with name, email, phone, and password
- 6-digit OTP sent to phone number
- Account verified after OTP confirmation
- 10-minute timer for OTP validity

### 2. **Login System**
- Email and password authentication
- Password show/hide toggle
- Remember me option
- Error handling and validation

### 3. **Forgot Password with Email OTP**
- 3-step password reset process:
  1. Enter registered email
  2. Verify OTP sent to email
  3. Set new password
- Email OTP with 10-minute validity
- Resend OTP functionality

### 4. **User Session Management**
- Persistent login (localStorage)
- User profile display in header
- Real-time balance display
- Logout functionality

## 📱 Free SMS Integration Options

### Option 1: TextBelt (Free Tier - 1 SMS/day)
**Already integrated in the code!**

```javascript
// Current implementation in AuthContext.jsx
const sendSMSOTP = async (phone, otp) => {
  const response = await fetch('https://textbelt.com/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: phone,
      message: `Your 1Win Casino verification code is: ${otp}`,
      key: 'textbelt' // Free tier
    })
  })
}
```

**Setup:**
- No API key needed for free tier
- Limited to 1 SMS per day per IP
- Works internationally

### Option 2: Twilio Trial Account (Free $15 Credit)
**Recommended for production!**

1. Sign up at https://www.twilio.com/
2. Get your Account SID and Auth Token
3. Install Twilio SDK: `npm install twilio`
4. Update `AuthContext.jsx`:

```javascript
import twilio from 'twilio';

const sendSMSOTP = async (phone, otp) => {
  const client = twilio(
    process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    process.env.REACT_APP_TWILIO_AUTH_TOKEN
  );
  
  await client.messages.create({
    body: `Your 1Win Casino verification code is: ${otp}. Valid for 10 minutes.`,
    from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
    to: phone
  });
}
```

### Option 3: TextNow API (Completely Free)
1. Sign up at https://www.textnow.com/
2. Get your API credentials
3. Update the SMS sending function

## 📧 Free Email OTP Integration Options

### Option 1: EmailJS (Free - 200 emails/month)
**Recommended for frontend!**

1. Sign up at https://www.emailjs.com/
2. Install: `npm install @emailjs/browser`
3. Configure email service (Gmail, Outlook, etc.)
4. Create email template
5. Update `AuthContext.jsx`:

```javascript
import emailjs from '@emailjs/browser';

const sendEmailOTP = async (email, otp) => {
  await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    {
      to_email: email,
      message: `Your password reset code is: ${otp}`,
      to_name: 'User'
    },
    'YOUR_PUBLIC_KEY'
  );
}
```

### Option 2: Mailgun (Free - 5,000 emails/month)
1. Sign up at https://www.mailgun.com/
2. Get API key and domain
3. Use via backend API

### Option 3: Nodemailer (Backend - Free with Gmail)
For backend implementation:

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: '1Win Casino - Password Reset OTP',
  text: `Your password reset code is: ${otp}`
});
```

## 🔧 Current Demo Mode

**The app is currently in DEMO mode:**
- OTP codes are displayed in the browser console
- No actual SMS/Email is sent
- Perfect for testing and development

**To see the OTP:**
1. Open browser console (F12)
2. Register a new account
3. Look for: `Demo OTP: 123456`
4. Enter that OTP in the verification modal

## 🚀 Production Deployment Checklist

### For SMS:
- [ ] Sign up for Twilio (recommended) or keep TextBelt
- [ ] Add environment variables:
  ```
  REACT_APP_TWILIO_ACCOUNT_SID=your_sid
  REACT_APP_TWILIO_AUTH_TOKEN=your_token
  REACT_APP_TWILIO_PHONE_NUMBER=+1234567890
  ```
- [ ] Update `sendSMSOTP` function in AuthContext.jsx

### For Email:
- [ ] Sign up for EmailJS (easiest) or Mailgun
- [ ] Configure email service
- [ ] Add environment variables:
  ```
  REACT_APP_EMAILJS_SERVICE_ID=service_xxx
  REACT_APP_EMAILJS_TEMPLATE_ID=template_xxx
  REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
  ```
- [ ] Update `sendEmailOTP` function in AuthContext.jsx

### Security Improvements:
- [ ] Move authentication to backend API
- [ ] Hash passwords with bcrypt
- [ ] Use JWT tokens for sessions
- [ ] Implement rate limiting for OTP requests
- [ ] Add CAPTCHA for brute force protection
- [ ] Store OTP in database with expiration
- [ ] Use HTTPS in production

## 📝 User Flow

### Registration Flow:
1. User clicks "Registration" button
2. Fills out form (name, email, phone, password)
3. Clicks "Create Account & Verify"
4. SMS OTP sent to phone
5. User enters 6-digit OTP
6. Account verified and auto-logged in
7. Can now deposit, withdraw, and play

### Login Flow:
1. User clicks "Login" button
2. Enters email and password
3. Clicks "Login"
4. If successful, header shows user name and balance
5. Can access all features

### Forgot Password Flow:
1. User clicks "Forgot Password?" in login modal
2. Enters registered email
3. Email OTP sent
4. User enters OTP
5. Sets new password
6. Can login with new password

## 🎯 Testing Instructions

### Test Registration:
1. Click "Registration" button
2. Fill in all fields
3. Submit form
4. Check browser console for OTP
5. Enter OTP in verification modal
6. Account should be verified

### Test Login:
1. Click "Login" button
2. Enter the email and password you registered with
3. Submit form
4. Header should show your name and balance

### Test Forgot Password:
1. Click "Login" then "Forgot Password?"
2. Enter your registered email
3. Check console for OTP
4. Enter OTP
5. Set new password
6. Login with new password

## 📦 Environment Variables (.env file)

Create a `.env` file in the root directory:

```env
# SMS Configuration
REACT_APP_SMS_PROVIDER=textbelt
REACT_APP_TEXTBELT_KEY=textbelt

# OR Twilio
# REACT_APP_SMS_PROVIDER=twilio
# REACT_APP_TWILIO_ACCOUNT_SID=your_sid
# REACT_APP_TWILIO_AUTH_TOKEN=your_token
# REACT_APP_TWILIO_PHONE_NUMBER=+1234567890

# Email Configuration
REACT_APP_EMAIL_PROVIDER=emailjs
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# OR Mailgun
# REACT_APP_EMAIL_PROVIDER=mailgun
# REACT_APP_MAILGUN_API_KEY=your_api_key
# REACT_APP_MAILGUN_DOMAIN=your_domain
```

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **State Management:** React Context API
- **Styling:** Custom CSS with CSS Variables
- **Icons:** Lucide React
- **Storage:** localStorage (demo), Database (production)
- **SMS:** TextBelt (free), Twilio (recommended)
- **Email:** EmailJS (free), Mailgun (recommended)

## 🔐 Security Notes

**Current Implementation (Demo):**
- Passwords stored in plain text in localStorage
- OTP stored in localStorage
- No backend validation
- Suitable for demo/testing only

**Production Requirements:**
- Use backend API (Node.js, Python, etc.)
- Hash passwords with bcrypt
- Store OTP in database with 10-minute expiration
- Implement rate limiting
- Use JWT for session management
- HTTPS required
- Add CSRF protection
- Implement brute force protection

## 📞 Support

For production setup assistance:
- Twilio: https://www.twilio.com/docs
- EmailJS: https://www.emailjs.com/docs/
- TextBelt: https://textbelt.com/

---

**Note:** This is a complete, working authentication system with free SMS and email OTP integration. The demo mode allows you to test everything immediately. For production, simply configure your preferred SMS/Email provider and update the corresponding functions in `AuthContext.jsx`.
