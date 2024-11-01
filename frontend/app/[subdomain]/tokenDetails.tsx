'use client'

import {
  useState,
} from 'react';
import { Address } from 'viem';
import { ContractFunctions } from '@/common/constants';
import {
  useReadContract,
} from 'wagmi';
import { IdeaType } from '@/common/types';
import { Loader } from '@/common/components/atoms';
import { Toaster } from '@/common/components/molecules';
import { Website } from './website';
import { TradeTable } from './tradeTable';
import { TokenCard } from './tokenCard';
import { BuyToken } from './buyToken';
import { useGetTransfers } from './useGetTransfers';
import { useGetOwners } from './useGetOwners';
import ideaAbi from '@/utils/abis/ideaFactory.json'

export const TokenDetails = ({
  tokenAddress,
} : {
  tokenAddress: string;
}) => {
  const [tokenInfoLoading, setTokenInfoLoading] = useState(false);
  const {
    data: ideaToken,
    isLoading,
    refetch: mutateIdea,
  } = useReadContract({
    abi: ideaAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    functionName: ContractFunctions.getIdea,
    args: [tokenAddress],
    query: {
      refetchInterval: 10000,
    },
  });

  const {
    transfers,
    mutateTransfers,
  } = useGetTransfers({
    tokenAddress,
  })

  const {
    owners,
    mutateOwners,
  } = useGetOwners({
    tokenAddress,
  })

  const idea = ideaToken as IdeaType
  return (
    <div>
      {(isLoading || !idea || tokenInfoLoading) && <Loader />}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-8 pt-24 px-4 md:px-0 lg:pt-32 pb-12">
        <div className="lg:w-4/5 flex flex-col gap-4" style={{ perspective: '1000px' }}>
          <Website idea={idea} />
          {transfers?.length ? (
            <TradeTable
              idea={idea}
              transfers={transfers}
            />
          ) : null}
        </div>
        <div className="flex flex-col lg:flex-col gap-4">
          {idea ? (
            <TokenCard
              owners={owners}
              idea={idea}
            />
          ) : null}
          <BuyToken
            idea={idea}
            setTokenInfoLoading={setTokenInfoLoading}
            tokenAddress={tokenAddress}
            mutateTransfers={mutateTransfers}
            mutateOwners={mutateOwners}
            mutateIdea={mutateIdea}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
