import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import seed from './models/server/seed'
import getOrCreateStorage from './models/server/storage'


 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    await Promise.all([
        seed(),
        getOrCreateStorage()
    ])

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }