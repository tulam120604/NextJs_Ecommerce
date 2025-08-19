import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// verify jwt
const secretJWT = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
const allowRole = ["admin_global", "admin_local", "seller"];
const verifyToken = async (token: string) => {
  try {
    const secret = await jwtVerify(String(token), secretJWT);
    return secret;
  } catch (error) {
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/trung-tam-dieu-khien")) {
    const token = request.cookies.get("access_token");
    const verifyTokenResult: any = await verifyToken(token?.value || "");
    const role = verifyTokenResult?.payload?.role;
    if (!role || !allowRole.includes(role)) {
      return NextResponse.redirect(new URL("/", request.url), 302);
    }
    if (
      role === "seller" &&
      !(
        pathname.startsWith("/trung-tam-dieu-khien/bang-dieu-khien") ||
        pathname.startsWith("/trung-tam-dieu-khien/san-pham") ||
        pathname.startsWith("/trung-tam-dieu-khien/don-hang")
      )
    ) {
      return NextResponse.redirect(
        new URL("/trung-tam-dieu-khien/bang-dieu-khien/tong-quan", request.url),
        302
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/trung-tam-dieu-khien/:path*"],
};
