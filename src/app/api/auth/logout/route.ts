import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`, 302);

  // Xóa tất cả cookies
  for (const cookie of allCookies) {
    response.cookies.set({
      name: cookie.name,
      value: '',
      maxAge: 0,
      path: '/'
    });
  }

  return response;
}
