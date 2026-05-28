import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [category, setCategory] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/listings')
      setListings(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const filtered = listings.filter(l => {
    const matchType = type === 'all' || l.type === type
    const matchCategory = category === 'All' || l.category === category
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase())
    return matchType && matchCategory && matchSearch
  })

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const token = localStorage.getItem('token')

  return (
    <div style={{ fontFamily: 'Sora, sans-serif', background: '#f7f5ff', minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #ede9ff', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #5a3ff5, #9b5de5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🎓 CampusBazaar</span>
        <div style={{ display: 'flex', gap: 12 }}>
          {token ? (
            <>
              <button onClick={() => navigate('/create')} style={{ background: 'linear-gradient(135deg, #5a3ff5, #9b5de5)', color: '#fff', border: 'none', borderRadius: 12, padding: '8px 20px', fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer' }}>+ Post Listing</button>
              <button onClick={logout} style={{ background: 'transparent', border: '1.5px solid #d4ceff', borderRadius: 12, padding: '8px 20px', fontFamily: 'Sora, sans-serif', fontWeight: 500, cursor: 'pointer', color: '#5a4fa3' }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1.5px solid #d4ceff', borderRadius: 12, padding: '8px 20px', fontFamily: 'Sora, sans-serif', fontWeight: 500, cursor: 'pointer', color: '#5a4fa3' }}>Login</button>
              <button onClick={() => navigate('/register')} style={{ background: 'linear-gradient(135deg, #5a3ff5, #9b5de5)', color: '#fff', border: 'none', borderRadius: 12, padding: '8px 20px', fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer' }}>Register</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a0845, #3d1fa9)', padding: '64px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Buy, Sell & Rent<br /><span style={{ background: 'linear-gradient(90deg, #c4b5fd, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>across every campus</span></h1>
        <p style={{ color: '#c4b5fd', fontSize: 18, marginBottom: 32 }}>Find what you need or make some extra money</p>
        <input placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: 500, padding: '14px 24px', borderRadius: 14, border: 'none', fontSize: 16, fontFamily: 'Sora, sans-serif', outline: 'none' }} />
      </div>

      {/* Filters */}
      <div style={{ maxWidth: 1200, margin: '32px auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {['all', 'sell', 'rent'].map(t => (
            <button key={t} onClick={() => setType(t)}
              style={{ padding: '8px 20px', borderRadius: 999, border: '1.5px solid #d4ceff', background: type === t ? '#5a3ff5' : '#fff', color: type === t ? '#fff' : '#5a4fa3', fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
              {t === 'all' ? 'All Items' : t === 'sell' ? '🛒 Buy' : '🔑 Rent'}
            </button>
          ))}
          {['All', 'Books', 'Electronics', 'Furniture', 'Transport', 'Stationery'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ padding: '8px 20px', borderRadius: 999, border: '1.5px solid #d4ceff', background: category === cat ? '#5a3ff5' : '#fff', color: category === cat ? '#fff' : '#5a4fa3', fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#7c6fb8', gridColumn: '1/-1' }}>
              <div style={{ fontSize: 48 }}>🔍</div>
              <p style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>No listings found</p>
            </div>
          ) : filtered.map(item => (
            <div key={item._id} style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #ede9ff', overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ background: item.type === 'rent' ? '#fff3e0' : '#f0eeff', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative' }}>
                {item.category === 'Books' ? '📚' : item.category === 'Electronics' ? '💻' : item.category === 'Furniture' ? '🪑' : item.category === 'Transport' ? '🚲' : '✏️'}
                <span style={{ position: 'absolute', top: 10, left: 10, background: item.type === 'rent' ? '#fff3e0' : '#f0eeff', color: item.type === 'rent' ? '#e65100' : '#5a3ff5', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700, border: `1px solid ${item.type === 'rent' ? '#ffcc80' : '#d4ceff'}` }}>
                  {item.type === 'rent' ? '🔑 RENT' : '🛒 SELL'}
                </span>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1035', marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#5a3ff5', marginBottom: 8 }}>₹{item.price}</p>
                <p style={{ fontSize: 12, color: '#7c6fb8' }}>📍 {item.college} • {item.condition}</p>
                <p style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>by {item.seller?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}