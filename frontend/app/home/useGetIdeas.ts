import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ContractFunctions } from '@/common/constants';
import {
  IdeaType,
  IdeaTypeWithDomains,
} from '@/common/types';
import {
  useReadContract,
} from 'wagmi';
import { Address } from 'viem';
import { SubdomainType } from '@/middleware';
import { createClient } from '@/common/utils/supabase/client';
import { ethers } from "ethers";
import { useWindowDimensions } from '@/common/hooks/useWindowDimensions';
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
      return ideaTokens.sort((a, b) => {
        const aFunding = parseFloat(ethers.formatUnits(a.fundingRaised, 'ether'))
        const bFunding = parseFloat(ethers.formatUnits(b.fundingRaised, 'ether'))
        return bFunding - aFunding
      }).map((item) => {
        return {
          idea: item as IdeaType,
          subdomains,
        }
      }).filter((item, index) => index < 10)
    }
    return []
  }, [ideaTokens, subdomains])

  const columnCount = useMemo(() => {
    if (windowSize === 'desktop') {
      return 4
    }
    if (windowSize === 'desktopLowRes') {
      return 2
    }
    if (windowSize === 'tablet') {
      return 2
    }
    return 1
  }, [windowSize])
  return {
    ideas,
    isLoading,
    columnCount,
  }
}
