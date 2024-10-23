import useSWR from 'swr';
import { getTransfersFromMoralisUrl } from "@/common/utils/network/endpoints";
import { fetcher } from '@/common/utils/network/baseFetcher';
import { 
  Get_Transfers_Dto, 
  TransferType,
} from './types';

const REFRESH_INTERVAL = 5000

export const useGetTransfers = ({ tokenAddress } : { tokenAddress: string }) => {
  const url = getTransfersFromMoralisUrl.replace('%tokenAddress%', tokenAddress).replace('%chainId%', 'polygon amoy')
  const result = useSWR<Get_Transfers_Dto>(url, url => fetcher(
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
      mutateTransfers: mutate,
      transfers: data.result as Array<TransferType>,
    }
  }
  return {
    mutateTransfers: mutate,
    transfers: [],
  }
}