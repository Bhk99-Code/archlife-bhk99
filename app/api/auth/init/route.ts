import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';

// POST - Create initial admin (only works if no admin exists)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Check if any admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json(
        { success: false, error: 'Admin already exists. Use login instead.' },
        { status: 400 }
      );
    }

    const { email, password, name } = await request.json();

    // Create first admin
    const admin = await Admin.create({
      email: email || process.env.ADMIN_EMAIL || 'admin@archlifebhk99.com',
      password: password || process.env.ADMIN_PASSWORD || 'Admin@123',
      name: name || 'Admin',
      role: 'super-admin',
    });

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      data: {
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET - Check if admin exists
export async function GET() {
  try {
    await dbConnect();
    
    const adminCount = await Admin.countDocuments();
    
    return NextResponse.json({
      success: true,
      adminExists: adminCount > 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
