import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function ListingDetail() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchListing()
  }, [])

  const fetchListing = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/listings/${id}`)
      setListing(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{ fontFamily: 'Sora, sans-serif', minHeight: '100vh', background: '#f7f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: 18, color: '#5a4fa3' }}>Loading...</p>
    </div>
  )

  if (!listing) return (
    <div style={{ fontFamily: 'Sora, sans-serif', minHeight: '100vh', background: '#f7f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontSize: 18, color: '#5a4fa3' }}>Listing not found</p>
    </div>
  )

  const categoryEmoji = {
    Books: '📚', Electronics: '💻', Furniture: '🪑', Transport: '🚲', Stationery: '✏️'
  }

  return (
    <div style={{ fontFamily: 'Sora, sans-serif', background: '#f7f5ff', minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #ede9ff', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, position: 'sticky', top: 0, zIndex: 50 }}>
        <span onClick={() => navigate('/')} style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #5a3ff5, #9b5de5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}>🎓 CampusBazaar</span>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1.5px solid #d4ceff', borderRadius: 12, padding: '8px 20px', fontFamily: 'Sora, sans-serif', fontWeight: 500, cursor: 'pointer', color: '#5a4fa3' }}>← Back</button>
      </nav>

      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        
        {/* Left — Image */}
        <div style={{ background: listing.type === 'rent' ? '#fff3e0' : '#f0eeff', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, minHeight: 320, border: '1.5px solid #ede9ff' }}>
          {categoryEmoji[listing.category] || '📦'}
        </div>

        {/* Right — Details */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span style={{ background: listing.type === 'rent' ? '#fff3e0' : '#f0eeff', color: listing.type === 'rent' ? '#e65100' : '#5a3ff5', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, border: `1px solid ${listing.type === 'rent' ? '#ffcc80' : '#d4ceff'}` }}>
              {listing.type === 'rent' ? '🔑 FOR RENT' : '🛒 FOR SALE'}
            </span>
            <span style={{ background: '#f0eeff', color: '#5a3ff5', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 600 }}>{listing.category}</span>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1a1035', marginBottom: 8 }}>{listing.title}</h1>
          <p style={{ fontSize: 36, fontWeight: 800, color: '#5a3ff5', marginBottom: 16 }}>₹{listing.price}{listing.type === 'rent' ? '/month' : ''}</p>

          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>{listing.description}</p>

          {/* Details */}
          <div style={{ background: '#f7f5ff', borderRadius: 16, padding: 20, marginBottom: 24 }}>
            {[
              ['Condition', listing.condition],
              ['College', listing.college],
              ['Seller', listing.seller?.name],
              ['Posted', new Date(listing.createdAt).toLocaleDateString()],
            ].map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ede9ff' }}>
                <span style={{ color: '#7c6fb8', fontSize: 14 }}>{key}</span>
                <span style={{ color: '#1a1035', fontSize: 14, fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <button style={{ width: '100%', background: 'linear-gradient(135deg, #5a3ff5, #9b5de5)', color: '#fff', border: 'none', borderRadius: 14, padding: '14px', fontSize: 16, fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>
            💬 Contact Seller
          </button>
          <button style={{ width: '100%', background: 'transparent', border: '1.5px solid #d4ceff', borderRadius: 14, padding: '14px', fontSize: 16, fontFamily: 'Sora, sans-serif', fontWeight: 500, cursor: 'pointer', color: '#5a4fa3' }}>
            ❤️ Save to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}