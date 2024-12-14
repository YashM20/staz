

// export async function middleware(request: NextRequest) {
//   const session = await auth()
  
//   // Add auth to request
//   return NextResponse.next()
// }

export async function middleware() {
}

// Remove or modify the config to exclude auth routes from edge runtime
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}