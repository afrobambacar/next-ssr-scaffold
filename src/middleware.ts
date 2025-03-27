"use server"

import type { NextRequest } from "next/server"
import { NextResponse, userAgent } from "next/server"

export default async function middleware(req: NextRequest) {  
  // for passing the healthcheck from AWS ALB
  if (/ELB-HealthChecker/.test(userAgent(req).ua)) {
    return NextResponse.json({}, { status: 200 })
  }

  const { pathname, search } = req.nextUrl

  // handle the apis requires accessToken
  if (pathname.startsWith("/api")) {
    const requestHeaders = new Headers(req.headers)
    const url = `${process.env.NEXT_PUBLIC_WWW_HOST}${pathname}${search}`
    const originalRequest = new Request(url, {
      headers: requestHeaders,
      method: req.method,
      body: req.body,
      redirect: 'manual',
    })

    return fetch(originalRequest)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
