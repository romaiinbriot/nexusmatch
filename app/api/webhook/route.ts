import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const email = session.customer_email
      const plan = getPlanFromAmount(session.amount_total || 0)

      if (email) {
        // Trouve l'utilisateur par email
        const { data: authUser } = await supabase.auth.admin.listUsers()
        const user = authUser?.users?.find(u => u.email === email)

        if (user) {
          // Met à jour le plan dans profiles
          await supabase.from('profils').upsert({
            id: user.id,
            plan: plan,
          })

          // Crée l'abonnement
          await supabase.from('abonnements').upsert({
            user_id: user.id,
            stripe_sub_id: session.subscription as string,
            plan: plan,
            status: 'active',
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          })
        }
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabase.from('abonnements')
        .update({ status: 'cancelled' })
        .eq('stripe_sub_id', subscription.id)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      await supabase.from('abonnements')
        .update({ status: 'past_due' })
        .eq('stripe_sub_id', invoice.subscription as string)
      break
    }
  }

  return NextResponse.json({ received: true })
}

function getPlanFromAmount(amount: number): string {
  if (amount <= 900) return 'candidate_pro'
  if (amount <= 4900) return 'recruiter_starter'
  return 'recruiter_growth'
}