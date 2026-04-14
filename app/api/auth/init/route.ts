import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Admin init API called');
    
    // Connect to database
    await dbConnect();
    console.log('✅ Database connection established');
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne();
    console.log('Existing admin check:', existingAdmin ? 'Found' : 'Not found');
    
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'Admin already exists' },
        { status: 400 }
      );
    }
    
    // Create new admin
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'Admin@123',
      10
    );
    
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@archlifebhk99.com',
      password: hashedPassword,
      name: 'Admin',
    });
    
    console.log('✅ Admin created:', admin.email);
    
    return NextResponse.json(
      { success: true, message: 'Admin created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Admin init error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Support GET request too
export async function GET(req: NextRequest) {
  return POST(req);
}
