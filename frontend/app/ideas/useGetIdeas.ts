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
import { useGetCategories } from "./useGetCategories";
import { CategoryType } from "./types";
import abi from '@/utils/abis/ideaFactory.json'

export const useGetIdeas = () => {
  const [subdomains, setSubdomains] = useState<Array<SubdomainType>>([])
  const supabase = createClient();

  const {
    windowSize,
  } = useWindowDimensions()

  const {
    categories,
    setCategories,
    isCategoriesLoading,
    currentCategory,
    setCurrentCategory,
  } = useGetCategories()

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
      }).filter((item) =>
        item.idea.categories.includes(currentCategory) || currentCategory === 'All',
      )
    }
    return []
  }, [ideaTokens, subdomains, currentCategory])

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

  const handleCategoryChange = (c: CategoryType) => {
    setCurrentCategory(c.value)
    setCategories(categories.map((category) => {
      if (category.id === c.id) {
        return {
          ...category,
          active: true,
        }
      }
      return {
        ...category,
        active: false,
      }
    }))
  }

  return {
    categories,
    setCategories,
    isLoading: isCategoriesLoading || isLoading,
    ideas,
    columnCount,
    currentCategory,
    handleCategoryChange,
  }
}
