import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkServerSession } from './lib/api/serverApi';
import { parse } from 'cookie';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const data = await checkServerSession();
      const setCookie = data.headers['set-cookie'];

      if (setCookie) {
        const response = NextResponse.next();
        const cookiesArr = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookiesArr) {
          const parsed = parse(cookieStr);

          if (parsed.accessToken) {
            response.cookies.set('accessToken', parsed.accessToken, {
              path: '/',
              maxAge: Number(parsed['Max-Age']),
            });
          }

          if (parsed.refreshToken) {
            response.cookies.set('refreshToken', parsed.refreshToken, {
              path: '/',
              maxAge: Number(parsed['Max-Age']),
            });
          }
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url), response);
        }

        if (isPrivateRoute) {
          return response;
        }
      }
    } catch {}
  }

  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
