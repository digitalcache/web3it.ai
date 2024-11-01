'use server'

import { redirect } from 'next/navigation'
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { ethers } from "ethers";
import { landingPageDescription } from '@/common/constants';
import ideaAbi from '@/utils/abis/ideaFactory.json'

export async function navigate (href: string) {
  redirect(href)
}

export async function generate (input: string) {
  'use server';

  const { object } = await generateObject({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: 'You are a founder who is trying to create their Minimum Viable Product and need a landing page for their product. The product will mostly revolve around web3 technologies',
    prompt: input,
    maxTokens: 4000,
    schema: z.object({
      ideaName: z.string().describe('Name of the product'),
      ideaLandingPage: z.string().describe(landingPageDescription),
      ideaLogo: z.string().describe('Provide SVG code and create the logo for the idea with the idea name as the text in the logo'),
      ideaDescription: z.string().describe('Provide a maximum of 300 character description about the product'),
      ideaTicker: z.string().describe('Come up with a ticker symbol for the product consisting of 4 capital letters'),
    }),
  });
  return object
}

export async function costBasedOnTokens (totalSupply: number, purchaseAmount: number) {
  'use server';

  const provider = new ethers.InfuraProvider("sepolia", process.env.RPC_URL);
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '', ideaAbi, provider);
  const costInWei = await contract.calculateCost(totalSupply, purchaseAmount);
  return costInWei
}
