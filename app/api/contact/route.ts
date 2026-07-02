import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // For now, use a default user ID since this is a public endpoint
    // In production, you'd want to associate this with the portfolio owner
    const defaultUserId = process.env.PORTFOLIO_OWNER_ID || 'public'

    // Insert contact submission
    await db.insert(contactSubmissions).values({
      userId: defaultUserId,
      name,
      email,
      message,
    })

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you soon!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'POST to this endpoint to submit a contact form' },
    { status: 200 }
  )
}
