import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
    }

    const body = await req.json();
    const response = await fetch(`${process.env.API_BASE_URL}/users/${params.id}`, {
      method: 'PUT',
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const accessToken = (await cookies()).get('access_token')?.value;
    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
    }

    const response = await fetch(`${process.env.API_BASE_URL}/users/${params.id}`, {
      method: 'DELETE',
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
