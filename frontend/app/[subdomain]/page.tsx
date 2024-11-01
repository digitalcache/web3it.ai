import { createClient } from '@/common/utils/supabase/client';
import { readContract } from '@wagmi/core'
import { Metadata } from 'next';
import { config } from '@/config';
// import { ethers } from "ethers";
import { Address } from 'viem';
import { ContractFunctions } from '@/common/constants';
import { IdeaType } from '@/common/types';
import NotFound from '../not-found';
import { TokenDetails } from './tokenDetails';
import ideaAbi from '@/utils/abis/ideaFactory.json'

export const maxDuration = 20

export async function generateMetadata ({ params } : {
  params: {
    subdomain: string;
  }
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: subdomains } = await supabase.from('Subdomains').select('*')
  if (subdomains?.length) {
    const subdomainData = subdomains.find((d) => d.subdomain === params.subdomain)
    if (subdomainData?.address) {
      const ideaToken = await readContract(config, {
        abi: ideaAbi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
        functionName: ContractFunctions.getIdea,
        args: [subdomainData.address],
      });
      const idea = ideaToken as IdeaType
      return {
        title: `Web3It.AI | ${idea.name}`,
        description: `${idea.description}`,
      }
    }
  }
  return {}
}

const TokenDetail = async ({ params } : {
  params: {
    subdomain: string;
  }
}) => {
  const supabase = createClient();
  const { data: subdomains } = await supabase.from('Subdomains').select('*')

  async function costBasedOnTokens (totalSupply: number, purchaseAmount: number) {
    'use server';
    return 300
    // const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    // const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', ideaAbi, provider);
    // const costInWei = await contract.calculateCost(totalSupply, purchaseAmount);
    // return costInWei
  }

  if (subdomains?.length) {
    const subdomainData = subdomains.find((d) => d.subdomain === params.subdomain)
    if (subdomainData?.address) {
      return (
        <TokenDetails tokenAddress={subdomainData.address} costBasedOnTokens={costBasedOnTokens} />
      )
    }
  }
  return <NotFound />
};

export default TokenDetail;
