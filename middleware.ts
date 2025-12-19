import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if maintenance mode is enabled
    // We use process.env directly. on Vercel this can be set in project settings.
    // Locally it can be in .env.local
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

    if (isMaintenanceMode) {
        // Return early if already on maintenance page to avoid loop
        if (request.nextUrl.pathname === '/maintenance') {
            return NextResponse.next()
        }

        // Redirect to maintenance page
        return NextResponse.redirect(new URL('/maintenance', request.url))
    } else {
        // If not in maintenance mode, but user tries to access /maintenance, 
        // we can optionally redirect them back to home or just let them see it.
        // For now, we'll redirect them to home to avoid confusion.
        if (request.nextUrl.pathname === '/maintenance') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes) -> We might want to block APIs too, but usually assets are most important. 
         *   Actually, for "Server Overall Stop", we SHOULD block API too? 
         *   The user said "Server overall stop". 
         *   Let's NOT exclude API from the maintenance check, but we need to exclude static files.
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
