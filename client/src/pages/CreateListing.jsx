import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
  const [form, setForm] = useState({ title: '', description: '', price: '', type: 'sell', category: 'Books', condition: 'Good', college: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/listings', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Are you logged in?')
    }
  }

  return (
    <div style={{ fontFamily: 'Sora, sans-serif', minHeight: '100vh', background: '#f7f5ff', padding: '40px 24px' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 540, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '40px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1035', marginBottom: 8 }}>Post a Listing 📦</h2>
        <p style={{ color: '#7c6fb8', marginBottom: 32 }}>Fill in the details below</p>

        {error && <p style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{error}</p>}

        {[
          { label: 'Title', name: 'title', placeholder: 'e.g. Engineering Mathematics Book', type: 'text' },
          { label: 'Price (₹)', name: 'price', placeholder: 'e.g. 250', type: 'number' },
          { label: 'College', name: 'college', placeholder: 'e.g. DTU', type: 'text' },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#5a4fa3', display: 'block', marginBottom: 6 }}>{field.label}</label>
            <input type={field.type} name={field.name} placeholder={field.placeholder} value={form[field.name]} onChange={handleChange}
              style={{ width: '100%', border: '1.5px solid #d4ceff', borderRadius: 12, padding: '12px 16px', fontFamily: 'Sora, sans-serif', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        ))}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#5a4fa3', display: 'block', marginBottom: 6 }}>Description</label>
          <textarea name="description" placeholder="Describe your item..." value={form.description} onChange={handleChange} rows={3}
            style={{ width: '100%', border: '1.5px solid #d4ceff', borderRadius: 12, padding: '12px 16px', fontFamily: 'Sora, sans-serif', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Type', name: 'type', options: ['sell', 'rent'] },
            { label: 'Category', name: 'category', options: ['Books', 'Electronics', 'Furniture', 'Transport', 'Stationery'] },
            { label: 'Condition', name: 'condition', options: ['Excellent', 'Good', 'Fair'] },
          ].map(field => (
            <div key={field.name}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#5a4fa3', display: 'block', marginBottom: 6 }}>{field.label}</label>
              <select name={field.name} value={form[field.name]} onChange={handleChange}
                style={{ width: '100%', border: '1.5px solid #d4ceff', borderRadius: 12, padding: '12px 10px', fontFamily: 'Sora, sans-serif', fontSize: 13, outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                {field.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}
          style={{ width: '100%', background: 'linear-gradient(135deg, #5a3ff5, #9b5de5)', color: '#fff', border: 'none', borderRadius: 14, padding: '14px', fontSize: 16, fontFamily: 'Sora, sans-serif', fontWeight: 600, cursor: 'pointer' }}>
          🚀 Post Listing
        </button>

        <button onClick={() => navigate('/')}
          style={{ width: '100%', background: 'transparent', border: '1.5px solid #d4ceff', borderRadius: 14, padding: '14px', fontSize: 16, fontFamily: 'Sora, sans-serif', fontWeight: 500, cursor: 'pointer', color: '#5a4fa3', marginTop: 12 }}>
          Cancel
        </button>
      </div>
    </div>
  )
}