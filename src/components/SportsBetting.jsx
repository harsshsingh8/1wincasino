import { Trophy, TrendingUp, Calendar } from 'lucide-react'
import './SportsBetting.css'

function SportsBetting() {
  const sports = [
    { id: 1, sport: 'Football', league: 'Premier League', match: 'Manchester United vs Liverpool', odds: { home: 2.10, draw: 3.40, away: 3.20 }, live: true },
    { id: 2, sport: 'Basketball', league: 'NBA', match: 'Lakers vs Warriors', odds: { home: 1.85, draw: null, away: 1.95 }, live: true },
    { id: 3, sport: 'Tennis', league: 'ATP Finals', match: 'Djokovic vs Nadal', odds: { home: 1.65, draw: null, away: 2.20 }, live: false },
    { id: 4, sport: 'Cricket', league: 'IPL', match: 'Mumbai Indians vs CSK', odds: { home: 1.75, draw: null, away: 2.05 }, live: true },
  ]

  return (
    <section className="sports-betting">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Sports Betting</h2>
            <p className="section-subtitle">Best odds on your favorite sports</p>
          </div>
          <button className="btn-view-all">All Sports</button>
        </div>

        <div className="sports-grid">
          {sports.map((match) => (
            <div key={match.id} className="sport-card">
              {match.live && (
                <div className="live-badge">
                  <div className="live-dot"></div>
                  LIVE
                </div>
              )}
              <div className="sport-header">
                <div className="sport-icon">
                  <Trophy size={20} />
                </div>
                <div className="sport-info">
                  <h3>{match.sport}</h3>
                  <p>{match.league}</p>
                </div>
              </div>
              
              <div className="match-info">
                <p className="match-name">{match.match}</p>
                <div className="match-time">
                  <Calendar size={14} />
                  <span>Today, 20:00</span>
                </div>
              </div>

              <div className="odds-container">
                <button className="odds-btn">
                  <span className="odds-label">1</span>
                  <span className="odds-value">{match.odds.home}</span>
                </button>
                {match.odds.draw && (
                  <button className="odds-btn">
                    <span className="odds-label">X</span>
                    <span className="odds-value">{match.odds.draw}</span>
                  </button>
                )}
                <button className="odds-btn">
                  <span className="odds-label">2</span>
                  <span className="odds-value">{match.odds.away}</span>
                </button>
              </div>

              <div className="sport-footer">
                <div className="markets-count">
                  <TrendingUp size={14} />
                  <span>150+ markets</span>
                </div>
                <button className="btn-bet-now">Bet Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SportsBetting
