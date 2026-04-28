import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import './Hero.css'

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Welcome Bonus 500%",
      subtitle: "On Your First Deposit",
      description: "Get up to $1,000 bonus on your first deposit",
      cta: "Claim Bonus",
      gradient: "linear-gradient(135deg, #1a5cff 0%, #0d2f8f 100%)"
    },
    {
      id: 2,
      title: "Cashback 30%",
      subtitle: "Every Week",
      description: "Get weekly cashback on all your losses",
      cta: "Learn More",
      gradient: "linear-gradient(135deg, #ff6b35 0%, #cc4e28 100%)"
    },
    {
      id: 3,
      title: "Free Spins",
      subtitle: "100 Free Spins Daily",
      description: "Claim your free spins every day on top slots",
      cta: "Play Now",
      gradient: "linear-gradient(135deg, #00d084 0%, #008f5a 100%)"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero">
      <div className="hero-slider">
        <div 
          className="hero-slide" 
          style={{ background: slides[currentSlide].gradient }}
        >
          <div className="hero-content">
            <div className="hero-badge">{slides[currentSlide].subtitle}</div>
            <h2 className="hero-title">{slides[currentSlide].title}</h2>
            <p className="hero-description">{slides[currentSlide].description}</p>
            <button className="btn-hero-cta">
              {slides[currentSlide].cta}
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="hero-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>

        <button className="slider-btn slider-prev" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="slider-btn slider-next" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <div className="stat-value">10,000+</div>
          <div className="stat-label">Games</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">$2M+</div>
          <div className="stat-label">Daily Payouts</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">24/7</div>
          <div className="stat-label">Support</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">150+</div>
          <div className="stat-label">Countries</div>
        </div>
      </div>
    </section>
  )
}

export default Hero
