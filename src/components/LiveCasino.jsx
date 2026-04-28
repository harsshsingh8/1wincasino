import { Play, Users } from 'lucide-react'
import './LiveCasino.css'

function LiveCasino() {
  const liveGames = [
    { id: 1, name: 'Live Blackjack', dealer: 'Dealer Anna', players: 234, image: '🎴' },
    { id: 2, name: 'Live Roulette', dealer: 'Dealer Marco', players: 456, image: '🎰' },
    { id: 3, name: 'Live Baccarat', dealer: 'Dealer Sophia', players: 189, image: '🃏' },
    { id: 4, name: 'Live Poker', dealer: 'Dealer James', players: 312, image: '♠️' },
    { id: 5, name: 'Dragon Tiger', dealer: 'Dealer Lily', players: 278, image: '🐉' },
    { id: 6, name: 'Live Sic Bo', dealer: 'Dealer Chen', players: 145, image: '🎲' },
  ]

  return (
    <section className="live-casino">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Live Casino</h2>
            <p className="section-subtitle">Experience real dealers in real-time</p>
          </div>
          <button className="btn-view-all">View All</button>
        </div>

        <div className="live-games-grid">
          {liveGames.map((game) => (
            <div key={game.id} className="live-game-card">
              <div className="live-badge">
                <div className="live-dot"></div>
                LIVE
              </div>
              <div className="live-game-image">
                <div className="live-game-emoji">{game.image}</div>
                <button className="btn-play-live">
                  <Play size={20} />
                  Play Now
                </button>
              </div>
              <div className="live-game-info">
                <h3>{game.name}</h3>
                <p className="dealer-name">{game.dealer}</p>
                <div className="live-stats">
                  <div className="players-count">
                    <Users size={14} />
                    <span>{game.players} playing</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LiveCasino
