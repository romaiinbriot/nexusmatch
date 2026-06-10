'use client'

import { useState } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Vérifie ton email pour confirmer ton compte !')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#060810',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: '#0D1220', border: '1px solid #1A2540',
        borderRadius: 16, padding: '40px', width: '100%', maxWidth: 400
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
          fontSize: 28, textAlign: 'center', marginBottom: 8,
          background: 'linear-gradient(135deg, #4F8EF7, #F0B429)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>NexusMatch</div>
        
        <p style={{ color: '#8896A7', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>
          {isSignUp ? 'Créer un compte' : 'Connexion'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              background: '#101624', border: '1px solid #1A2540',
              borderRadius: 9, padding: '12px 14px', color: '#E2E8F0',
              fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
            }}
          />
          <input
            type="password" placeholder="Mot de passe" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAuth()}
            style={{
              background: '#101624', border: '1px solid #1A2540',
              borderRadius: 9, padding: '12px 14px', color: '#E2E8F0',
              fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
            }}
          />
          
          {message && (
            <p style={{ color: message.includes('email') ? '#22C55E' : '#F87171', fontSize: 13 }}>
              {message}
            </p>
          )}

          <button onClick={handleAuth} disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #4F8EF7, #2563EB)',
              color: '#fff', border: 'none', borderRadius: 9,
              padding: '13px', fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1, marginTop: 4
            }}>
            {loading ? '...' : isSignUp ? 'Créer mon compte' : 'Se connecter'}
          </button>

          <button onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none', border: 'none', color: '#4F8EF7',
              fontSize: 13, cursor: 'pointer', textAlign: 'center'
            }}>
            {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
          </button>
        </div>
      </div>
    </div>
  )
}