import { NextRequest, NextResponse } from 'next/server';
import { userRepo } from '../../_helpers/server/user-repo';

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const res = await userRepo.registerUser(data);

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong', error },
      { status: 500 }
    );
  }
}
