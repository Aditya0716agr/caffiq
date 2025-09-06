import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { comments } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let query = db.select().from(comments).orderBy(desc(comments.createdAt));

    if (search) {
      const searchCondition = or(
        like(comments.name, `%${search}%`),
        like(comments.email, `%${search}%`),
        like(comments.subject, `%${search}%`),
        like(comments.comment, `%${search}%`)
      );
      query = query.where(searchCondition);
    }

    const results = await query.limit(limit).offset(offset);

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
      createdAt: new Date().toISOString()
    };

    // Insert into database
    const newComment = await db.insert(comments)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}