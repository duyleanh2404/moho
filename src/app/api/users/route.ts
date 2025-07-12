import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
    }

    const body = await req.json();
    const response = await fetch(`${process.env.API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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

export async function GET(req: NextRequest) {
  try {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
    }

    const queryString = req.nextUrl.searchParams.toString();
    const response = await fetch(
      `${process.env.API_BASE_URL}/users${queryString ? `?${queryString}` : ''}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: 'Có lỗi xảy ra. Vui lòng thử lại!' }, { status: 500 });
  }
}
