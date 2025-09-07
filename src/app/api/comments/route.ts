import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let query = supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%,comment.ilike.%${search}%`);
    }

    const { data: results, error } = await query;

    if (error) {
      console.error('Get comments error:', error);
      return NextResponse.json({ 
        error: 'Database error getting comments' 
      }, { status: 500 });
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { name, email, subject, comment } = requestBody;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ 
        error: "Email is required",
        code: "MISSING_EMAIL" 
      }, { status: 400 });
    }

    if (!comment) {
      return NextResponse.json({ 
        error: "Comment is required",
        code: "MISSING_COMMENT" 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Invalid email format",
        code: "INVALID_EMAIL" 
      }, { status: 400 });
    }

    // Validate comment is not empty
    if (comment.trim().length === 0) {
      return NextResponse.json({ 
        error: "Comment cannot be empty",
        code: "EMPTY_COMMENT" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name ? name.trim() : null,
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : null,
      comment: comment.trim(),
      created_at: new Date().toISOString()
    };

    // Insert into database
    const { data: newComment, error } = await supabase
      .from('comments')
      .insert(sanitizedData)
      .select()
      .single();

    if (error) {
      console.error('Insert comment error:', error);
      return NextResponse.json({ 
        error: 'Database error creating comment' 
      }, { status: 500 });
    }

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}