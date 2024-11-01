'use client'

import { Footer } from '@/common/components/organisms';
import lang from '@/common/lang';
import { abbreviateNumber } from '@/utils/helpers';
import { Toaster } from "@/common/components/molecules";
import { CreateToken } from './createToken';

const { createIdea: createIdeaCopy } = lang

const TokenCreate = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-32 relative overflow-hidden">
      <div className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-500"></div>
      <div className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-[15] absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[200px] rounded-full bg-opacity-30 bg-purple-500"></div>
      <div className='container mx-auto flex flex-col items-center px-4 md:px-0 mb-10'>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center text-white">
          {createIdeaCopy.heading}
        </h2>
        <h1 className="max-w-[400px] text-center text-neutral-200 w-full text-sm border-b border-white border-opacity-10 pb-4">
          {createIdeaCopy.subHeading}
        </h1>
        <p className="text-neutral-200 mt-4 text-xs font-medium">
          <span className='font-normal'>{createIdeaCopy.tokenCreationFeeLabel}</span> {process.env.NEXT_PUBLIC_IDEA_CREATION_FEE || ''} {process.env.NEXT_PUBLIC_CURRENCY || ''}
        </p>
        <p className="text-neutral-200 text-xs font-medium">
          <span className='font-normal'>{createIdeaCopy.maxSupplyLabel}</span>
          {abbreviateNumber(process.env.NEXT_PUBLIC_MAX_SUPPLY || '0')}
          {createIdeaCopy.tokensSuffix}
        </p>
        <p className="text-neutral-200 text-xs font-medium">
          <span className='font-normal'>{createIdeaCopy.initialMintLabel}</span>
          {abbreviateNumber(process.env.NEXT_PUBLIC_INITIAL_SUPPLY || '0')}
          {createIdeaCopy.tokensSuffix}
        </p>
        <p className="text-neutral-200 mb-8 text-xs text-center">
          <span>{createIdeaCopy.targetInfoPart1}</span>
          <span className='font-medium'>{process.env.NEXT_PUBLIC_TARGET_ETH || ''} </span>
          <span className='font-medium'>{process.env.NEXT_PUBLIC_CURRENCY || ''} </span>
          <span>{createIdeaCopy.targetInfoPart2}</span>
        </p>
        <CreateToken />
      </div>
      <Footer />
      <Toaster />
    </div>
  )
};

export default TokenCreate
