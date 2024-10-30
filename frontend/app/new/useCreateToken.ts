import {
  useEffect,
  useState,
} from 'react';
import { Address } from 'viem';
import mql from '@microlink/mql'
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import { routes } from '@/common/routes';
import { createClient } from '@/common/utils/supabase/client';
import { ContractFunctions } from '@/common/constants';
import {
  useAccount,
  useConnect,
  useTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors'
import { toast } from "react-hot-toast";
import { pinataUploadUrl } from '@/common/utils/network/endpoints';
import lang from '@/common/lang';
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetCategories } from './useGetCategories';
import { useAddCategory } from './useAddCategory';
import { tokenSchema } from './validationSchema';
import { TokenDTO } from './types';
import abi from '@/utils/abis/ideaFactory.json'

const { createIdea: createIdeaCopy } = lang

export const useCreateToken = () => {
  const router = useRouter()
  const { connect } = useConnect()
  const supabase = createClient();
  const searchParams = useSearchParams()
  const createdIdeaId = searchParams.get('ideaId')
  const [isSupabaseSubmitting, setIsSupabaseSubmitting] = useState(false)
  const [isIdeaFetching, setIsIdeaFetching] = useState(false)
  const [ideaCreatedThroughAI, setIdeaCreatedThroughAI] = useState(false)
  const [txnHash, setTxnHash] = useState('')
  const [imageProcessing, setImageProcessing] = useState(false)
  const MEME_CREATION_FEE = BigInt(100000000000000)

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    setFocus,
    getValues,
    trigger,
    formState: {
      errors, isSubmitting,
    },
  } = useForm<TokenDTO>({
    resolver: yupResolver(tokenSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      categories: [],
      ticker: '',
      imageUrl: '',
      description: '',
      website: '',
      twitter: '',
    },
  });

  const {
    isConnected,
  } = useAccount()

  const {
    writeContractAsync,
    isPending,
  } = useWriteContract()

  const {
    data: tokenData,
    isLoading,
  } = useTransactionReceipt({
    hash: txnHash as Address,
    query: {
      enabled: txnHash ? true : false,
    },
  })

  const {
    data: categories,
    isCategoriesLoading,
    mutateCategories,
  } = useGetCategories()

  const {
    isAddingCategory,
    onSubmit: addCategory,
  } = useAddCategory()

  useEffect(() => {
    if (isSubmitting) {
      const typelessErrors = errors as any
      const firstError = Object.keys(typelessErrors).reduce((field: any, a) => {
        return !!typelessErrors[field] ? field : a;
      }, null);

      if (firstError) {
        setFocus(firstError, { shouldSelect: true });
        const elementToScrollTo = document.getElementById(firstError)
        if (elementToScrollTo) {
          const y = elementToScrollTo.getBoundingClientRect().top + window.scrollY;
          window.scroll({
            top: y - 500,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [errors, setFocus, isSubmitting])

  useEffect(() => {
    const fetchAIGeneratedIdea = async () => {
      if (createdIdeaId) {
        try {
          setIsIdeaFetching(true)
          const { data: newIdea } = await supabase
            .from('NewIdeas')
            .select("*")
            .eq('id', createdIdeaId)
          if (newIdea?.length) {
            setValue('name', newIdea[0].name)
            setValue('description', newIdea[0].description)
            setValue('website', newIdea[0].landingPage)
            setValue('imageUrl', newIdea[0].logo)
            setValue('ticker', newIdea[0].ticker)
            setIdeaCreatedThroughAI(true)
          }
        } catch (error) {
          toast.error(createIdeaCopy.ideaNotFound)
        } finally {
          setIsIdeaFetching(false)
        }
      }
    }
    fetchAIGeneratedIdea()
  }, [createdIdeaId, supabase, setValue])

  useEffect(() => {
    const addTokenAddressToJSON = async () => {
      if (tokenData) {
        setIsSupabaseSubmitting(true)
        const { data: subdomains } = await supabase.from('Subdomains').select('*')
        if (subdomains) {
          const duplicatedDomain = subdomains.find((d) => d.subdomain === getValues('ticker').toLowerCase())
          try {
            const tokenAddressFromLog = tokenData.logs.find((l) => !l.address.startsWith('0x00'))
            if (tokenAddressFromLog) {
              await supabase.from('Subdomains').insert([
                {
                  subdomain: duplicatedDomain ? `${duplicatedDomain.subdomain}1` : getValues('ticker').toLowerCase(),
                  address: tokenAddressFromLog.address.toLowerCase(),
                  name: getValues('name'),
                },
              ])
              setIsSupabaseSubmitting(false)
              reset()
              toast.success(createIdeaCopy.ideaCreatedMessage)
              router.push(routes.viewProjectsPath)
            }
          } catch (err) {
            toast.error(createIdeaCopy.errorOccured)
            setIsSupabaseSubmitting(false)
          }
        }
      }
    }
    addTokenAddressToJSON()
  }, [tokenData, router, reset, getValues, supabase])

  const onSubmit: SubmitHandler<TokenDTO> = async (data) => {
    const createToken = async () => {
      try {
        setImageProcessing(true)
        const {
          data: websiteData,
        } = await mql(data.website, {
          screenshot: true,
        })
        if (websiteData?.screenshot?.url) {
          fetch(websiteData.screenshot.url)
            .then((res) => res.blob())
            .then(async (myBlob) => {
              const fileFromMicroLink = new File([myBlob], 'image.jpeg', {
                type: myBlob.type,
              });
              const pinataData = new FormData();
              pinataData.set("file", fileFromMicroLink);
              const uploadRequest = await fetch(pinataUploadUrl, {
                method: "POST",
                body: pinataData,
              });
              const pinataWebsiteScreenshotUrl = await uploadRequest.json();
              setImageProcessing(false)
              if (pinataWebsiteScreenshotUrl && data.categories) {
                const categoryValues = data.categories.map((category) => {
                  const foundCategory = categories?.find((c) => c.id === category)
                  if (foundCategory) {
                    return foundCategory.name
                  }
                  return ''
                })
                const payload = [
                  data.name,
                  data.ticker,
                  data.imageUrl,
                  data.description.replaceAll(",", "$comma$"),
                  categoryValues.join('/'),
                  pinataWebsiteScreenshotUrl,
                  data.website,
                  data.twitter || '',
                ]
                const transaction = await writeContractAsync({
                  abi,
                  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
                  functionName: ContractFunctions.createIdeaToken,
                  value: MEME_CREATION_FEE,
                  args: payload,
                })
                setTxnHash(transaction)
              }
            });
        }
      } catch (error: unknown) {
        setImageProcessing(false)
        toast.error(createIdeaCopy.errorOccured)
      }
    }
    if (!isConnected) {
      connect({
        connector: injected(),
      }, {
        onSuccess: async () => {
          await createToken()
        },
      })
    } else {
      createToken()
    }
  };
  return {
    isSupabaseSubmitting,
    isIdeaFetching,
    ideaCreatedThroughAI,
    imageProcessing,
    handleSubmit,
    control,
    isLoading,
    isPending,
    onSubmit,
    setValue,
    getValues,
    isCategoriesLoading,
    mutateCategories,
    categories,
    isAddingCategory,
    trigger,
    addCategory,
  }
}
