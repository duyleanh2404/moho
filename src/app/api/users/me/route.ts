import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessToken = (await cookies()).get('access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
    }

    const response = await fetch(`${process.env.API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: 'Có lỗi xảy ra. Vui lòng thử lại!' }, { status: 500 });
  }
}
