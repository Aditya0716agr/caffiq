import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    const { data: existingSignup, error: checkError } = await supabase
      .from('waitlist_signups')
      .select('id')
      .eq('email', sanitizedEmail)
      .limit(1);

    if (checkError) {
      console.error('Check existing signup error:', checkError);
      return NextResponse.json({ 
        error: 'Database error checking existing signup' 
      }, { status: 500 });
    }

    if (existingSignup && existingSignup.length > 0) {
      return NextResponse.json({ 
        error: "Email already registered for waitlist",
        code: "DUPLICATE_EMAIL" 
      }, { status: 409 });
    }

    // Create new waitlist signup
    const { data: newSignup, error: insertError } = await supabase
      .from('waitlist_signups')
      .insert({
        email: sanitizedEmail,
        name: sanitizedName,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert signup error:', insertError);
      
      // Handle unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json({ 
          error: "Email already registered for waitlist",
          code: "DUPLICATE_EMAIL" 
        }, { status: 409 });
      }

      return NextResponse.json({ 
        error: 'Database error creating signup' 
      }, { status: 500 });
    }

    return NextResponse.json(newSignup, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
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
      const { count, error } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Count error:', error);
        return NextResponse.json({ 
          error: 'Database error getting count' 
        }, { status: 500 });
      }

      return NextResponse.json({ count: count || 0 }, { status: 200 });
    } else {
      // Return all signups
      const { data: signups, error } = await supabase
        .from('waitlist_signups')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Get signups error:', error);
        return NextResponse.json({ 
          error: 'Database error getting signups' 
        }, { status: 500 });
      }

      return NextResponse.json(signups, { status: 200 });
    }

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}