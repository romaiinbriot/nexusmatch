'use client'

import { useState } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const PLANS = [
  {
    name: 'Gratuit',
    price: 0,
    color: '#8896A7',
    icon: '👤',
    description: 'Pour découvrir NexusMatch',
    features: ['5 matchs par mois', 'Profil basique', 'Accès au marché'],
    priceId: null,
  },
  {
    name: 'Candidat Pro',
    price: 9,
    color: '#4F8EF7',
    icon: '⚡',
    description: 'Pour les candidats actifs',
    features: ['Matchs illimités', 'Simulateur d\'entretien IA', 'Coach négociation', 'Score de marché', 'Mode stealth'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CANDIDATE,
    popular: false,
  },
  {
    name: 'Recruteur Starter',
    price: 49,
    color: '#F0B429',
    icon: '🏢',
    description: 'Pour les TPE et freelances RH',
    features: ['5 postes actifs', 'Matching IA illimité', 'Pipeline de suivi', 'Insights marché', 'Support email'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
    popular: true,
  },
  {
    name: 'Recruteur Growth',
    price: 99,
    color: '#22C55E',
    icon: '🚀',
    description: 'Pour les scale-ups',
    features: ['Postes illimités', 'Analytics avancés', 'API access', 'Warm intro IA', 'Support prioritaire'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH,
    popular: false,
  },
]

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

const handleSubscribe = async (plan: typeof PLANS[0]) => {
    if (plan.price === 0) { router.push('/login'); return }
    setLoading(plan.name)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: plan.priceId, email: user.email })
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else alert('Erreur : ' + data.error)
    setLoading(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060810', color: '#E2E8F0', fontFamily: 'Inter, sans-serif', padding: '60px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div onClick={() => router.push('/')} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 24, background: 'linear-gradient(135deg, #4F8EF7, #F0B429)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', marginBottom: 24 }}>
            NexusMatch
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Tarifs simples et transparents
          </h1>
          <p style={{ color: '#8896A7', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
            Commencez gratuitement. Upgradez quand vous êtes prêt.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{
              background: plan.popular ? plan.color + '18' : '#0D1220',
              border: `2px solid ${plan.popular ? plan.color : '#1A2540'}`,
              borderRadius: 16, padding: '28px 24px', position: 'relative',
              transition: 'transform 0.2s',
            }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: plan.color, color: '#000', borderRadius: 20, padding: '4px 16px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  ⭐ Plus populaire
                </div>
              )}
              <div style={{ fontSize: 32, marginBottom: 12 }}>{plan.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ color: '#8896A7', fontSize: 13, marginBottom: 20 }}>{plan.description}</div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 40, color: plan.color }}>
                  {plan.price === 0 ? 'Gratuit' : `${plan.price}€`}
                </span>
                {plan.price > 0 && <span style={{ color: '#8896A7', fontSize: 14 }}>/mois</span>}
              </div>
              <div style={{ marginBottom: 24 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 13.5 }}>
                    <span style={{ color: plan.color, fontSize: 16 }}>✓</span>
                    <span style={{ color: '#CBD5E1' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => handleSubscribe(plan)} disabled={loading === plan.name}
                style={{
                  width: '100%', padding: '12px', borderRadius: 10, border: 'none',
                  background: plan.price === 0 ? 'transparent' : plan.color,
                  color: plan.price === 0 ? plan.color : plan.name === 'Recruteur Starter' ? '#000' : '#fff',
                  border: plan.price === 0 ? `1.5px solid ${plan.color}` : 'none',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  opacity: loading === plan.name ? 0.6 : 1,
                }}>
                {loading === plan.name ? '...' : plan.price === 0 ? 'Commencer gratuitement' : 'Choisir ce plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 48, color: '#4B5A6E', fontSize: 13 }}>
          Paiement sécurisé par Stripe · Annulation à tout moment · Sans engagement
        </div>
      </div>
    </div>
  )
}