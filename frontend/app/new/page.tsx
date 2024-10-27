'use client'

import { Footer } from '@/common/components/organisms';
import { CreateToken } from './createToken';

const TokenCreate = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-32 relative overflow-hidden">
      <div className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-500"></div>
      <div className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-500"></div>
      <div className='container mx-auto flex flex-col items-center px-4 md:px-0 mb-10'>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-white">Create Idea</h2>
        <h2 className="max-w-[400px] text-center text-white w-full border-b border-white border-opacity-10 pb-4">Register your Idea by creating a token and try to give as much details as possible</h2>
        <p className="text-neutral-200 mt-4 text-xs font-semibold">Idea token creation fee: 0.0001 ETH</p>
        <p className="text-neutral-200 text-xs font-semibold">Max supply: 1 million tokens. Initial mint: 200k tokens.</p>
        <p className="text-neutral-200 mb-8 text-xs font-semibold text-center">If funding target of 24 ETH is met, a liquidity pool will be created on Uniswap.</p>
        <CreateToken />
      </div>
      <Footer />
    </div>
  )
};

export default TokenCreate
