import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Verify credentials against environment variables
    const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (email !== validEmail || password !== validPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create a simple token (in production, use proper JWT or sessions)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      token,
      email,
      message: 'Login successful',
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
