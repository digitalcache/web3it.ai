import { createClient } from '@/common/utils/supabase/client';
import NotFound from '../not-found';
import { TokenDetails } from './tokenDetails';

export const maxDuration = 20

const TokenDetail = async ({ params } : {
  params: {
    subdomain: string;
  }
}) => {
  const supabase = createClient();
  const { data: subdomains } = await supabase.from('Subdomains').select('*')

  if (subdomains?.length) {
    const subdomainData = subdomains.find((d) => d.subdomain === params.subdomain)
    if (subdomainData?.address) {
      return (
        <TokenDetails tokenAddress={subdomainData.address} />
      )
    }
  }
  return <NotFound />
};

export default TokenDetail;
