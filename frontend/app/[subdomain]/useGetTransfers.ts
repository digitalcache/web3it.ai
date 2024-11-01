import useSWR from 'swr';
import { getTransfersFromMoralisUrl } from "@/common/utils/network/endpoints";
import { fetcher } from '@/common/utils/network/baseFetcher';
import {
  Get_Transfers_Dto,
  TransferType,
} from './types';

export const getTransfers = async (key: string) => {
  return fetcher(key, {
    arg: {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
      },
    },
  })
}

export const useGetTransfers = ({ tokenAddress } : { tokenAddress: string }) => {
  const url = getTransfersFromMoralisUrl.replace('%tokenAddress%', tokenAddress).replace('%chainId%', 'polygon')
  const result = useSWR<Get_Transfers_Dto>(url, url => getTransfers(
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
      mutateTransfers: mutate,
      transfers: data.result as Array<TransferType>,
    }
  }
  return {
    mutateTransfers: mutate,
    transfers: [],
  }
}
