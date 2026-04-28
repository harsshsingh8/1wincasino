import { Gift, Calendar, ArrowRight } from 'lucide-react'
import './Promotions.css'

function Promotions() {
  const promotions = [
    {
      id: 1,
      title: 'Welcome Bonus 500%',
      description: 'Get up to $1,000 on your first deposit',
      image: '🎁',
      color: 'linear-gradient(135deg, #1a5cff, #4d7fff)'
    },
    {
      id: 2,
      title: 'Weekly Cashback',
      description: 'Receive 30% cashback every week',
      image: '💰',
      color: 'linear-gradient(135deg, #ff6b35, #ff8c5a)'
    },
    {
      id: 3,
      title: 'Free Spins Friday',
      description: 'Get 100 free spins every Friday',
      image: '🎰',
      color: 'linear-gradient(135deg, #00d084, #00e893)'
    },
    {
      id: 4,
      title: 'VIP Rewards',
      description: 'Exclusive bonuses for VIP members',
      image: '👑',
      color: 'linear-gradient(135deg, #ffd700, #ffed4e)'
    }
  ]

  return (
    <section className="promotions">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Promotions & Bonuses</h2>
            <p className="section-subtitle">Exclusive offers just for you</p>
          </div>
          <button className="btn-view-all">All Promotions</button>
        </div>

        <div className="promo-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              <div className="promo-image" style={{ background: promo.color }}>
                <div className="promo-emoji">{promo.image}</div>
                <div className="promo-badge">
                  <Gift size={16} />
                  <span>Active</span>
                </div>
              </div>
              <div className="promo-content">
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>
                <div className="promo-footer">
                  <div className="promo-time">
                    <Calendar size={14} />
                    <span>Limited time offer</span>
                  </div>
                  <button className="btn-claim">
                    Claim Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Promotions
