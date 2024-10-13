import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
      "/((?!api/|_next/|_static/|images|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};


export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const pathname = url.pathname;
  
    const hostname = req.headers.get("host");
    console.log(hostname)
    let currentHost;
    if (process.env.NODE_ENV === "production") {
      const baseDomain = process.env.BASE_DOMAIN;
      currentHost = hostname?.replace(`.${baseDomain}`, "");
    } else {
      currentHost = hostname?.split(":")[0].replace(".localhost", "");
    }
    if (!currentHost) {
      return NextResponse.next();
    }
    console.log("current", currentHost)
    const siteExists = true
    if (siteExists) {
        return NextResponse.rewrite(new URL(`/${currentHost}${pathname}`, req.url));
    }
  
    return new Response(null, { status: 404 });
    
    // return NextResponse.next();
};