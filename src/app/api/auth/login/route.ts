import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { loginErrorMessages } from '@/lib/error-messages';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await response.json();

    if (!response.ok) {
      // Kiểm tra nếu message nằm trong loginErrorMessages và có redirectTo
      const errorConfig = loginErrorMessages[result.message];
      if (errorConfig && typeof errorConfig === 'object' && 'redirectTo' in errorConfig) {
        cookieStore.set({
          name: 'verify_flow',
          value: '1',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 3 // 3 phút
        });
      }

      return NextResponse.json(result, { status: response.status });
    }

    cookieStore.set({
      name: 'access_token',
      value: result.access_token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 ngày
    });

    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Có lỗi xảy ra. Vui lòng thử lại!' }, { status: 500 });
  }
}
