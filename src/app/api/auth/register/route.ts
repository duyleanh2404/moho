import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    const res = NextResponse.json(result, { status: response.status });

    if (response.status === 201) {
      // Nếu đăng ký thành công (201), set verify_flow
      res.cookies.set({
        name: 'verify_flow',
        value: '1',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 3 // 3 phút
      });
    }

    return res;
  } catch {
    return NextResponse.json({ message: 'Có lỗi xảy ra. Vui lòng thử lại!' }, { status: 500 });
  }
}
