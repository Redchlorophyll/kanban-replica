import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("user.token")?.value;

  if (request.nextUrl.pathname.startsWith("/v1/kanban") && !cookie) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}
