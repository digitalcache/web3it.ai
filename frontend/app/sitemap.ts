import { createClient } from "@/common/utils/supabase/client";

type Subdomain = {
  url: string;
  lastModified: Date;
}

export default async function sitemap () {
  const baseUrl = 'web3it.ai';
  const supabase = createClient();
  const { data: Subdomains } = await supabase
    .from('Subdomains')
    .select('subdomain')
  const subdomainUrls: Array<Subdomain> = [];
  if (Subdomains?.length) {
    Subdomains.forEach((subdomain) => {
      const data = {
        url: `https://${subdomain.subdomain.toLowerCase()}.${baseUrl}`,
        lastModified: new Date(),
      }
      subdomainUrls.push(data as Subdomain)
    })
  }

  return [
    {
      url: `https://${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `https://${baseUrl}/new`,
      lastModified: new Date(),
    },
    {
      url: `https://${baseUrl}/generate`,
      lastModified: new Date(),
    },
    {
      url: `https://${baseUrl}/ideas`,
      lastModified: new Date(),
    },
    ...subdomainUrls,
  ]
}
