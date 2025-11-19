import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

	const publicRoutes = ['/login', '/signup']

	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if(!session && !publicRoutes.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if(session && publicRoutes.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
} 

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}