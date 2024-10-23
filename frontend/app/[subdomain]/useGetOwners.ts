import useSWR from 'swr';
import { getOwnersFromMoralisUrl } from "@/common/utils/network/endpoints";
import { fetcher } from '@/common/utils/network/baseFetcher';
import { 
  Get_Owners_Dto, 
  OwnerType,
} from './types';

const REFRESH_INTERVAL = 5000

export const useGetOwners = ({ tokenAddress } : { tokenAddress: string }) => {
  const url = getOwnersFromMoralisUrl.replace('%tokenAddress%', tokenAddress).replace('%chainId%', 'polygon amoy')
  const result = useSWR<Get_Owners_Dto>(url, url => fetcher(
    url,
  ), { 
    revalidateOnFocus: false,
    refreshInterval: REFRESH_INTERVAL,
  });

  const { 
    data,
    mutate,
  } = result;

  if (data) {
    return {
      mutateOwners: mutate,
      owners: data.result as Array<OwnerType>,
    }
  }
  return {
    mutateOwners: mutate,
    owners: [],
  }
}