'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [mode, setMode] = useState<'company' | 'candidate'>('company')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else { setUser(data.user); setLoading(false) }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    await new Promise(r => setTimeout(r, 1500))
    if (mode === 'company') {
      const { data } = await supabase.from('profils').select('*').limit(5)
      setResults(data || MOCK_CANDIDATES)
    } else {
      const { data } = await supabase.from('emplois').select('*').limit(5)
      setResults(data || MOCK_JOBS)
    }
    setSearching(false)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#060810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#4F8EF7', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>Chargement...</div>
    </div>
  )

  const NAV = [
    { id: 'dashboard', icon: '⚡', label: 'Dashboard' },
    { id: 'matching', icon: '🎯', label: 'Matching' },
    { id: 'profile', icon: '👤', label: 'Mon Profil' },
    { id: 'network', icon: '🕸', label: 'Réseau' },
    { id: 'market', icon: '📊', label: 'Marché' },
    { id: 'interview', icon: '🎤', label: 'Entretiens' },
    { id: 'negotiate', icon: '💰', label: 'Négociation' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#060810', color: '#E2E8F0', fontFamily: 'Inter, sans-serif' }}>
      {/* SIDEBAR */}
      <div style={{ width: 220, background: '#0C0F1A', borderRight: '1px solid #1A2540', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '18px 16px', borderBottom: '1px solid #1A2540' }}>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 18, background: 'linear-gradient(135deg, #4F8EF7, #F0B429)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            NexusMatch
          </span>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, border: 'none', cursor: 'pointer', marginBottom: 2, textAlign: 'left', background: page === n.id ? '#4F8EF718' : 'transparent', color: page === n.id ? '#4F8EF7' : '#8896A7', fontSize: 13.5, fontWeight: page === n.id ? 700 : 500 }}>
              <span style={{ fontSize: 18 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #1A2540' }}>
          <div style={{ fontSize: 12, color: '#4B5A6E', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          <button onClick={handleLogout} style={{ width: '100%', background: '#F8717118', border: '1px solid #F8717133', color: '#F87171', borderRadius: 8, padding: '8px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#060810EE', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1A2540', padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15 }}>
            {NAV.find(n => n.id === page)?.icon} {NAV.find(n => n.id === page)?.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#22C55E18', border: '1px solid #22C55E33', borderRadius: 20, padding: '4px 12px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            <span style={{ fontSize: 11.5, color: '#22C55E', fontWeight: 600 }}>Connecté</span>
          </div>
        </div>

        <div style={{ padding: '28px', maxWidth: 1000, margin: '0 auto' }}>

          {/* DASHBOARD PAGE */}
          {page === 'dashboard' && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Bienvenue 👋</h2>
              <p style={{ color: '#8896A7', fontSize: 13.5, marginBottom: 24 }}>{user?.email}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
                {[
                  { label: 'Score de marché', value: '94/100', color: '#22C55E', icon: '🏆' },
                  { label: 'Matches actifs', value: '47', color: '#4F8EF7', icon: '⚡' },
                  { label: 'Taux de réponse', value: '68%', color: '#F0B429', icon: '📩' },
                  { label: 'Connexions', value: '1,247', color: '#A78BFA', icon: '🕸' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#101624', border: '1px solid #1A2540', borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: '#3D4F6A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                    </div>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 26, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { icon: '🎯', label: 'Nouveau matching', page: 'matching', color: '#4F8EF7' },
                  { icon: '🎤', label: 'Simuler un entretien', page: 'interview', color: '#A78BFA' },
                  { icon: '📊', label: 'Tendances marché', page: 'market', color: '#F0B429' },
                  { icon: '💰', label: 'Coach négociation', page: 'negotiate', color: '#FB923C' },
                ].map(a => (
                  <button key={a.label} onClick={() => setPage(a.page)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderRadius: 12, background: a.color + '12', border: `1px solid ${a.color}22`, cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: 24 }}>{a.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: a.color }}>{a.label}</span>
                    <span style={{ marginLeft: 'auto', color: a.color, opacity: 0.5 }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MATCHING PAGE */}
          {page === 'matching' && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Matching IA</h2>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {[['company', '🏢 Recruter'], ['candidate', '👤 Je cherche']].map(([v, l]) => (
                  <button key={v} onClick={() => setMode(v as any)}
                    style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: mode === v ? '#4F8EF7' : 'transparent', color: mode === v ? '#fff' : '#8896A7', border: `1.5px solid ${mode === v ? '#4F8EF7' : '#1A2540'}` }}>
                    {l}
                  </button>
                ))}
              </div>
              <div style={{ background: '#101624', border: '1px solid #1A2540', borderRadius: 14, padding: '4px 4px 4px 16px', display: 'flex', gap: 8, marginBottom: 16 }}>
                <textarea value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder={mode === 'company' ? 'Décrivez le profil idéal...' : 'Décrivez vos compétences...'}
                  style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#E2E8F0', fontSize: 13.5, resize: 'none', padding: '12px 0', minHeight: 56, fontFamily: 'Inter, sans-serif' }} />
                <button onClick={handleSearch} disabled={searching}
                  style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, #4F8EF7, #2563EB)', color: '#fff', border: 'none', borderRadius: 9, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 4, opacity: searching ? 0.5 : 1 }}>
                  {searching ? '⏳ Analyse...' : '⚡ Matcher'}
                </button>
              </div>
              {results.length > 0 && results.map((item, i) => (
                <div key={i} style={{ background: '#101624', border: '1px solid #1A2540', borderRadius: 14, padding: '16px 18px', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#4F8EF722', border: '2px solid #4F8EF744', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4F8EF7', fontSize: 14 }}>
                      {(item.full_name || item.title || 'U').slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.full_name || item.title || 'Profil'}</div>
                      <div style={{ fontSize: 12.5, color: '#8896A7' }}>{item.title || item.sector || 'NexusMatch'} · {item.location || 'Paris'}</div>
                    </div>
                    <div style={{ background: '#22C55E22', border: '1px solid #22C55E44', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700, color: '#22C55E' }}>
                      {Math.floor(80 + Math.random() * 18)}% match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AUTRES PAGES */}
          {['profile', 'network', 'market', 'interview', 'negotiate'].includes(page) && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>
                {NAV.find(n => n.id === page)?.icon}
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                {NAV.find(n => n.id === page)?.label}
              </div>
              <div style={{ color: '#8896A7', fontSize: 14 }}>Module en cours de développement</div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

const MOCK_CANDIDATES = [
  { full_name: 'Sophie Laurent', title: 'Senior Product Manager', location: 'Paris' },
  { full_name: 'Thomas Mercier', title: 'Lead Developer', location: 'Lyon' },
  { full_name: 'Camille Roux', title: 'Head of Marketing', location: 'Paris' },
]

const MOCK_JOBS = [
  { title: 'VP Engineering', sector: 'Cloud / Infra', location: 'Paris' },
  { title: 'Senior PM', sector: 'SaaS Analytics', location: 'Remote' },
  { title: 'Lead Data Scientist', sector: 'HealthTech', location: 'Paris' },
]