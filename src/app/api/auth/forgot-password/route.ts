import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await response.json();

    // Nếu request không thành công, trả về lỗi
    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    // Nếu thành công, tạo response và set reset_flow
    const res = NextResponse.json(result, { status: response.status });

    res.cookies.set({
      name: 'reset_flow',
      value: '1',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 3 // 3 phút
    });

    return res;
  } catch {
    return NextResponse.json({ message: 'Có lỗi xảy ra. Vui lòng thử lại!' }, { status: 500 });
  }
}
