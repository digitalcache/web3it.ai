import useSWR from 'swr';
import { getOwnersFromMoralisUrl } from "@/common/utils/network/endpoints";
import { fetcher } from '@/common/utils/network/baseFetcher';
import {
  Get_Owners_Dto,
  OwnerType,
} from './types';

export const getOwners = async (key: string) => {
  return fetcher(key, {
    arg: {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
      },
    },
  })
}

export const useGetOwners = ({ tokenAddress } : { tokenAddress: string }) => {
  const url = getOwnersFromMoralisUrl.replace('%tokenAddress%', tokenAddress).replace('%chainId%', 'sepolia')
  const result = useSWR<Get_Owners_Dto>(url, url => getOwners(
    url,
  ), {
    revalidateOnFocus: true,
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
