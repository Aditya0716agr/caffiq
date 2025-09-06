import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { waitlistSignups } from '@/db/schema';
import { eq, count } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ 
        error: "Email is required",
        code: "MISSING_EMAIL" 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name ? name.trim() : null;

    // Check if email already exists
    const existingSignup = await db.select()
      .from(waitlistSignups)
      .where(eq(waitlistSignups.email, sanitizedEmail))
      .limit(1);

    if (existingSignup.length > 0) {
      return NextResponse.json({ 
        error: "Email already registered for waitlist",
        code: "DUPLICATE_EMAIL" 
      }, { status: 409 });
    }

    // Create new waitlist signup
    const newSignup = await db.insert(waitlistSignups)
      .values({
        email: sanitizedEmail,
        name: sanitizedName,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newSignup[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    
    // Handle database unique constraint violation as backup
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ 
        error: "Email already registered for waitlist",
        code: "DUPLICATE_EMAIL" 
      }, { status: 409 });
    }

    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get('count') === 'true';

    if (countOnly) {
      // Return only count
      const result = await db.select({ count: count() })
        .from(waitlistSignups);
      
      return NextResponse.json({ count: result[0].count }, { status: 200 });
    } else {
      // Return all signups
      const signups = await db.select()
        .from(waitlistSignups)
        .orderBy(waitlistSignups.createdAt);

      return NextResponse.json(signups, { status: 200 });
    }

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}