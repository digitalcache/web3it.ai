import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useReadContract,
} from 'wagmi';
import { ContractFunctions } from '@/common/constants';
import { useWindowDimensions } from "@/common/hooks/useWindowDimensions";
import {
  IdeaType,
  IdeaTypeWithDomains,
} from '@/common/types';
import { createClient } from "@/common/utils/supabase/client";
import { SubdomainType } from "@/middleware";
import { Address } from 'viem';
import abi from '@/utils/abis/ideaFactory.json'

export const useGetIdeas = () => {
  const [subdomains, setSubdomains] = useState<Array<SubdomainType>>([])
  const supabase = createClient();

  const {
    windowSize,
  } = useWindowDimensions()

  const {
    data: ideaTokens,
    isLoading,
  } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: ContractFunctions.getIdeas,
    query: {
      refetchInterval: 10000,
    },
  })

  useEffect(() => {
    const getSubdomains = async () => {
      const { data: subdomainsData } = await supabase.from('Subdomains').select('*')
      if (subdomainsData?.length) {
        setSubdomains(subdomainsData)
      }
    }
    getSubdomains()
  }, [supabase])

  const ideas = useMemo<IdeaTypeWithDomains>(() => {
    if (ideaTokens && Array.isArray(ideaTokens) && subdomains?.length) {
      return ideaTokens.toReversed().map((item) => {
        return {
          idea: item as IdeaType,
          subdomains,
        }
      })
    }
    return []
  }, [ideaTokens, subdomains])

  const columnCount = useMemo(() => {
    if (windowSize === 'desktop') {
      return 4
    }
    if (windowSize === 'desktopLowRes') {
      return 3
    }
    if (windowSize === 'tablet') {
      return 2
    }
    return 1
  }, [windowSize])
  return {
    isLoading,
    ideas,
    columnCount,
  }
}
