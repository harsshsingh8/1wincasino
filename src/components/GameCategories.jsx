import { useState } from 'react'
import { Search, Flame, Star, Clock, Trophy } from 'lucide-react'
import './GameCategories.css'

function GameCategories() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Games', icon: Star },
    { id: 'popular', label: 'Popular', icon: Flame },
    { id: 'new', label: 'New', icon: Clock },
    { id: 'slots', label: 'Slots', icon: Star },
    { id: 'table', label: 'Table Games', icon: Trophy },
  ]

  const games = [
    { id: 1, name: 'Book of Dead', category: 'popular', provider: 'Play\'n GO', image: '📚', rtp: '96.21%' },
    { id: 2, name: 'Starburst', category: 'popular', provider: 'NetEnt', image: '⭐', rtp: '96.09%' },
    { id: 3, name: 'Gonzo\'s Quest', category: 'popular', provider: 'NetEnt', image: '🗿', rtp: '95.97%' },
    { id: 4, name: 'Sweet Bonanza', category: 'new', provider: 'Pragmatic Play', image: '🍬', rtp: '96.48%' },
    { id: 5, name: 'Gates of Olympus', category: 'new', provider: 'Pragmatic Play', image: '⚡', rtp: '96.50%' },
    { id: 6, name: 'Big Bass Bonanza', category: 'slots', provider: 'Pragmatic Play', image: '🐟', rtp: '96.71%' },
    { id: 7, name: 'Reactoonz', category: 'slots', provider: 'Play\'n GO', image: '👾', rtp: '96.51%' },
    { id: 8, name: 'Blackjack VIP', category: 'table', provider: 'Evolution', image: '🃏', rtp: '99.28%' },
    { id: 9, name: 'European Roulette', category: 'table', provider: 'NetEnt', image: '🎰', rtp: '97.30%' },
    { id: 10, name: 'Baccarat Pro', category: 'table', provider: 'Microgaming', image: '🎴', rtp: '98.94%' },
    { id: 11, name: 'Wolf Gold', category: 'popular', provider: 'Pragmatic Play', image: '🐺', rtp: '96.00%' },
    { id: 12, name: 'The Dog House', category: 'new', provider: 'Pragmatic Play', image: '🐕', rtp: '96.51%' },
  ]

  const filteredGames = activeCategory === 'all' 
    ? games 
    : games.filter(game => game.category === activeCategory)

  return (
    <section className="game-categories">
      <div className="container">
        <div className="section-header">
          <h2>Popular Games</h2>
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search games..." />
          </div>
        </div>

        <div className="category-tabs">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon size={18} />
                <span>{category.label}</span>
              </button>
            )
          })}
        </div>

        <div className="games-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-image">
                <div className="game-emoji">{game.image}</div>
                <div className="game-overlay">
                  <button className="btn-play">Play Now</button>
                  <button className="btn-demo">Demo</button>
                </div>
                <div className="game-badge">{game.category}</div>
              </div>
              <div className="game-info">
                <h3 className="game-name">{game.name}</h3>
                <p className="game-provider">{game.provider}</p>
                <div className="game-stats">
                  <span className="rtp">RTP: {game.rtp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all">
          <button className="btn-view-all">
            View All Games
          </button>
        </div>
      </div>
    </section>
  )
}

export default GameCategories
