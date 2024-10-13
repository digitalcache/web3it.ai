import { NextRequest, NextResponse } from "next/server";
import subdomains from "./subdomains.json";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|images|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  console.log("headers",req.headers.get('host'))
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.web3it-ai-mocha.vercel.app`);

    console.log("1", hostname)

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.vercel.app`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      'web3it-ai-mocha.vercel.app'
    }`;
  }
  console.log('110', hostname)
  console.log("2", url.pathname)


  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  console.log("3", searchParams)
  console.log("4", path)

  if (
    hostname === "localhost:3000" ||
    hostname === 'web3it-ai-mocha.vercel.app'
  ) {
    console.log("here1")
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrites for app pages
  if (hostname === `localhost:3000` || hostname === 'web3it-ai-mocha.vercel.app') {
    console.log("here2")
    return NextResponse.next()
  }

  // special case for `vercel.pub` domain
  // if (hostname === "vercel.pub") {
  //   return NextResponse.redirect(
  //     "https://vercel.com/blog/platforms-starter-kit",
  //   );
  // }

  // rewrite root application to `/home` folder
 

  // rewrite everything else to `/[domain]/[slug] dynamic route
  console.log("here3", new URL(`/${hostname}${path}`, req.url).href)

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}

// export default async function middleware (req: NextRequest) {
//   const url = req.nextUrl;

//   let hostname = req.headers
//   .get("host")!
//   .replace(".localhost:3000", `.web3it-ai-mocha.vercel.app`);

//   if (
//     hostname.includes("---") &&
//     hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
//   ) {
//     hostname = `${hostname.split("---")[0]}.${
//       'web3it-ai-mocha.vercel.app'
//     }`;
//   }

//   const searchParams = req.nextUrl.searchParams.toString();
//   const path = `${url.pathname}${
//     searchParams.length > 0 ? `?${searchParams}` : ""
//   }`;

  
//   // console.log("hostname",hostname)

//   // Define list of allowed domains
//   // (including localhost and your deployed domain)
//   const homePages = [
//     "http://localhost:3000", 
//     "http://localhost:3000/",
//     "https://web3it-ai-mocha.vercel.app",
//     "https://web3it-ai-mocha.vercel.app/",
//   ]
//   const allowedDomains = ["localhost:3000", "vercel.app", "charlisfls-projects"];

//   // Check if the current hostname is in the list of allowed domains
//   const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));

//   // Extract the potential subdomain from the URL
//   const subdomain = hostname.split(".")[0];

//   // If user is on an allowed domain and it's not a subdomain, allow the request
//   if (isAllowedDomain && !subdomains.some((d: any) => d.subdomain === subdomain)) {
//     const isHomePage = homePages.some(href => href === url.href);
//     if (isHomePage) {
//       return NextResponse.rewrite(new URL('/home', req.url))
//     }
//     return NextResponse.next()
//   }

//   return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));

//   // const subdomainData = subdomains.find((d: any) => d.subdomain === subdomain);


//   // if (subdomainData) {
//   //   // Rewrite the URL to a dynamic path based on the subdomain
//   //   return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
//   // }

//   return new Response(null, { status: 404 });
// }