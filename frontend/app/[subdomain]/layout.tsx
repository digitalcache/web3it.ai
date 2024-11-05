import { ReactNode } from "react";
import {
  Footer, Header,
} from "@/common/components/organisms";
import { createClient } from '@/common/utils/supabase/client';
import { Metadata } from "next";
import { readContract } from '@wagmi/core'
import { config } from '@/config';
import { Address } from 'viem';
import { ContractFunctions } from '@/common/constants';
import { IdeaType } from '@/common/types';
import ideaAbi from '@/utils/abis/ideaFactory.json'

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
        title: `${idea.name} | Web3It.AI`,
        description: `${idea.description}`,
        alternates: {
          // canonical: '/ideas',
        },
      }
    }
  }
  return {}
}

export default function Layout ({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
