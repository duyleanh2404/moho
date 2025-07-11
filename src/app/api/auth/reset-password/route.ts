import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    // Tạo response
    const res = NextResponse.json(result, { status: response.status });

    // Xóa cookie reset_flow
    res.cookies.set({
      name: 'reset_flow',
      value: '',
      maxAge: 0,
      path: '/'
    });

    return res;
  } catch {
    return NextResponse.json({ message: 'Có lỗi xảy ra. Vui lòng thử lại!' }, { status: 500 });
  }
}
