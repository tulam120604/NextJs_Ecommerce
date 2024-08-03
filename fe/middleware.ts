import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.headers.get('authorization');
    console.log(token)


    return NextResponse.next();
}

export const config = {
    matcher:  ['/admin/:path*']
}