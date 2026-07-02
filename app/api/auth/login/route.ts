import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required', code: 'MISSING_CREDENTIALS' },
        { status: 400 }
      )
    }

    // Get credentials from environment variables
    const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    // Check if env vars are set
    if (!validEmail || !validPassword) {
      console.error('Admin credentials not configured in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error', code: 'CONFIG_ERROR' },
        { status: 500 }
      )
    }

    // Validate credentials
    if (email !== validEmail || password !== validPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password', code: 'AUTH_FAILED' },
        { status: 401 }
      )
    }

    // Create a simple token (in production, use proper JWT)
    const token = Buffer.from(`${email}:${Date.now()}:${Math.random()}`).toString('base64')

    return NextResponse.json(
      {
        token,
        email,
        message: 'Login successful',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'Login failed. Please check your input and try again.', 
        code: 'SERVER_ERROR',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}
