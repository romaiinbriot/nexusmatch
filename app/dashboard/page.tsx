'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Landing() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const FEATURES = [
    { icon: '🧠', title: 'Matching IA — 47 signaux', desc: 'Notre algorithme analyse les compétences, la culture, la trajectoire et le potentiel. Pas juste des mots-clés.' },
    { icon: '🔮', title: 'Prédiction de réussite', desc: 'Prédit la probabilité de succès à 12 mois. Réduisez votre turnover de 60%.' },
    { icon: '🕸️', title: 'Réseau vivant', desc: "Visualisez vos connexions jusqu'au 3ème degré. Le warm intro automatisé." },
    { icon: '🎤', title: "Simulateur d'entretien", desc: "Préparez chaque entretien avec un coach IA. Feedback instantané et score /10." },
    { icon: '💰', title: 'Coach de négociation', desc: 'Simulez la négociation salariale. Scripts exacts, stratégie personnalisée.' },
    { icon: '📊', title: 'War Room Marché', desc: 'Tendances en temps réel, grilles salariales, secteurs qui recrutent.' },
  ]

  const TESTIMONIALS = [
    { name: 'Marie L.', role: 'Head of Talent @ Scale-up', text: 'On a réduit notre temps de recrutement de 3 mois à 3 semaines. Le matching est bluffant.', avatar: 'ML' },
    { name: 'Thomas R.', role: 'Lead Dev en recherche', text: "J'ai trouvé mon poste actuel en 8 jours. Le simulateur d'entretien m'a vraiment préparé.", avatar: 'TR' },
    { name: 'Sophie M.', role: 'DRH @ PME', text: 'Enfin un outil accessible pour les PME. LinkedIn était hors budget. NexusMatch est parfait.', avatar: 'SM' },
  ]

  return (
    <div style={{ background: '#060810', color: '#E2E8F0', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? '#060810EE' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #1A2540' : 'none',
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s'
      }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 22, background: 'linear-gradient(135deg, #4F8EF7, #F0B429)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NexusMatch
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => router.push('/pricing')} style={{ background: 'none', border: 'none', color: '#8896A7', cursor: 'pointer', fontSize: 14 }}>Tarifs</button>
          <button onClick={() => router.push('/login')} style={{ background: 'none', border: '1px solid #1A2540', color: '#E2E8F0', cursor: 'pointer', fontSize: 14, padding: '8px 16px', borderRadius: 8 }}>Connexion</button>
          <button onClick={() => router.push('/login')} style={{ background: 'linear-gradient(135deg, #4F8EF7, #2563EB)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 700, padding: '8px 20px', borderRadius: 8 }}>
            Commencer gratuitement
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 50%, #0D1A3A 0%, #060810 70%)',
        padding: '80px 24px 40px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 780, animation: 'fadeUp 0.8s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4F8EF718', border: '1px solid #4F8EF744', borderRadius: 20, padding: '5px 16px', marginBottom: 28, fontSize: 12.5, color: '#4F8EF7', fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            47,832 offres actives · Matching en temps réel
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.08, marginBottom: 22, background: 'linear-gradient(135deg, #ffffff 0%, #4F8EF7 60%, #F0B429 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Le réseau professionnel<br />qui pense avant vous
          </h1>
          <p style={{ fontSize: 17, color: '#8896A7', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
            L'IA qui connecte les entreprises aux candidats parfaits — pas aux candidats disponibles. 47 signaux d'alignement. Précision inégalée.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <button onClick={() => router.push('/login')} style={{ background: 'linear-gradient(135deg, #4F8EF7, #2563EB)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 24px #4F8EF744' }}>
              🚀 Commencer gratuitement
            </button>
            <button onClick={() => router.push('/pricing')} style={{ background: '#F0B42918', color: '#F0B429', border: '1.5px solid #F0B42944', borderRadius: 12, padding: '14px 30px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Voir les tarifs →
            </button>
          </div>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['47', "signaux d'analyse"], ['< 2s', 'temps de matching'], ['97%', 'précision'], ['3x', 'taux de réponse']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 800, color: '#4F8EF7' }}>{v}</div>
                <div style={{ fontSize: 12, color: '#4B5A6E', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: '100px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 12 }}>
            Bien plus qu'un outil de matching
          </h2>
          <p style={{ color: '#8896A7', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Tout ce dont vous avez besoin pour recruter ou trouver le poste parfait.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#0D1220', border: '1px solid #1A2540', borderRadius: 14, padding: '24px', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#4F8EF766')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1A2540')}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13.5, color: '#8896A7', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: '80px 32px', background: '#0A0D18', borderTop: '1px solid #1A2540', borderBottom: '1px solid #1A2540' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>
            Ils ont trouvé leur match
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: '#101624', border: '1px solid #1A2540', borderRadius: 14, padding: '24px' }}>
                <div style={{ fontSize: 20, marginBottom: 14, color: '#F0B429' }}>★★★★★</div>
                <p style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#4F8EF722', border: '2px solid #4F8EF744', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4F8EF7', fontSize: 13 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: '#8896A7' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '100px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 16 }}>
            Prêt à trouver votre match parfait ?
          </h2>
          <p style={{ color: '#8896A7', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
            Commencez gratuitement. Pas de carte bancaire requise.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/login')} style={{ background: 'linear-gradient(135deg, #4F8EF7, #2563EB)', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 24px #4F8EF744' }}>
              Démarrer gratuitement
            </button>
            <button onClick={() => router.push('/pricing')} style={{ background: 'transparent', color: '#8896A7', border: '1px solid #1A2540', borderRadius: 12, padding: '16px 36px', fontSize: 16, cursor: 'pointer' }}>
              Voir les tarifs
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #1A2540', padding: '32px', textAlign: 'center', color: '#4B5A6E', fontSize: 13 }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 18, background: 'linear-gradient(135deg, #4F8EF7, #F0B429)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 }}>
          NexusMatch
        </div>
        © 2026 NexusMatch · Paiements sécurisés par Stripe · Hébergé en Europe
      </div>
    </div>
  )
}