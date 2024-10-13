import { NextResponse } from "next/server";
import subdomains from "./subdomains.json";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware (req: Request) {
  const url = new URL(req.url);
  const hostname = req.headers.get("host") || "";
  // console.log("hostname",hostname)

  // Define list of allowed domains
  // (including localhost and your deployed domain)
  const homePages = [
    "http://localhost:3000", 
    "http://localhost:3000/",
    "http://192.168.0.107:3000",
    "http://192.168.0.107:3000/",
    "https://web3it-ai-mocha.vercel.app",
    "https://web3it-ai-mocha.vercel.app/",
  ]
  const allowedDomains = ["localhost:3000", "192.168.0.107", "web3it-ai-mocha.vercel.app"];

  // Check if the current hostname is in the list of allowed domains
  const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));

  // Extract the potential subdomain from the URL
  const subdomain = hostname.split(".")[0];

  // If user is on an allowed domain and it's not a subdomain, allow the request
  if (isAllowedDomain && !subdomains.some((d: any) => d.subdomain === subdomain)) {
    const isHomePage = homePages.some(href => href === url.href);
    if (isHomePage) {
      return NextResponse.rewrite(new URL('/home', req.url))
    }
    return NextResponse.next()
  }

  const subdomainData = subdomains.find((d: any) => d.subdomain === subdomain);


  if (subdomainData) {
    // Rewrite the URL to a dynamic path based on the subdomain
    return NextResponse.rewrite(new URL(`/create-project`, req.url));
  }

  return new Response(null, { status: 404 });
}