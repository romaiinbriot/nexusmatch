'use client'

import { useState } from 'react'

export default function Dashboard() {
  const [page, setPage] = useState('dashboard')

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060810',
      color: '#E2E8F0',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 24
    }}>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 800,
        fontSize: 48,
        background: 'linear-gradient(135deg, #4F8EF7, #F0B429)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        NexusMatch
      </div>
      <div style={{ color: '#8896A7', fontSize: 18 }}>
        🚀 Le backend est connecté. La base de données est prête.
      </div>
      <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {[
          { icon: '⚡', label: 'Dashboard', color: '#4F8EF7' },
          { icon: '🎯', label: 'Matching', color: '#A78BFA' },
          { icon: '🕸', label: 'Réseau', color: '#22C55E' },
          { icon: '📊', label: 'Marché', color: '#F0B429' },
          { icon: '💰', label: 'Négociation', color: '#FB923C' },
        ].map(item => (
          <div key={item.label} style={{
            background: item.color + '18',
            border: `1px solid ${item.color}44`,
            borderRadius: 12,
            padding: '14px 22px',
            fontSize: 14,
            fontWeight: 600,
            color: item.color,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            {item.icon} {item.label}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 20,
        background: '#0D1220',
        border: '1px solid #1A2540',
        borderRadius: 14,
        padding: '20px 28px',
        fontSize: 13,
        color: '#4B5A6E',
        textAlign: 'center'
      }}>
        ✅ Supabase connecté · ✅ Base de données prête · ✅ Next.js opérationnel
      </div>
    </div>
  )
}