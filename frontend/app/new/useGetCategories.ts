import useSWR from 'swr';
import { categoriesUrl } from "@/common/utils/network/endpoints";
import { fetcher } from '@/common/utils/network/baseFetcher';
import {
  CategoriesDTO, CategoryType,
} from './types';

export const useGetCategories = () => {
  const result = useSWR<CategoriesDTO>(categoriesUrl, url => fetcher(
    url,
  ), {
    revalidateOnFocus: false,
  });

  const {
    data,
    isLoading,
    mutate,
  } = result;
  return {
    data: data?.data.map((d: CategoryType) => {
      return {
        label: d.value,
        value: d.value,
        name: d.value,
        id: d.id,
      };
    }) || [],
    isCategoriesLoading: isLoading,
    mutateCategories: mutate,
  }
}
