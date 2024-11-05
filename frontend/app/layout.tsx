import {
  ReactNode,
  Suspense,
} from "react";
import localFont from '@next/font/local'
import { Providers } from "@/utils/providers";
import { headers } from 'next/headers';
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { Metadata } from "next";
import '@rainbow-me/rainbowkit/styles.css'
import './globals.css'

const primaryFont = localFont({
  src: [
    {
      path: '../public/fonts/Chillax-Extralight.ttf',
      weight: '200',
    },
    {
      path: '../public/fonts/Chillax-Light.ttf',
      weight: '300',
    },
    {
      path: '../public/fonts/Chillax-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/Chillax-Medium.ttf',
      weight: '500',
    },
    {
      path: '../public/fonts/Chillax-Semibold.ttf',
      weight: '600',
    },
    {
      path: '../public/fonts/Chillax-Bold.ttf',
      weight: '700',
    },
    {
      path: '../public/fonts/Chillax-Variable.ttf',
      weight: '800',
    },
  ],
  variable: '--font-primaryFont',
})

export const metadata: Metadata = {
  title: 'Web3It.AI | Turn Public Good Ideas into Reality',
  description: "A home for ideas to get discovered, funded, and championed by the communities they serve. Time to launch something meaningful.",
  metadataBase: new URL("https://web3it.ai"),
  alternates: {
    canonical: '/',
  },
  keywords: 'crowdfunding blockchain, startup financing, early-stage blockchain, blockchain funding, startup blockchain support, blockchain for startups, blockchain investment platform, early-phase development blockchain, startup crowdfunding solution, blockchain funding innovation, blockchain equity crowdfunding, crypto fundraising, blockchain development funding, startup growth blockchain, blockchain accelerator for startups, innovative funding blockchain, blockchain startup ecosystem, digital currency crowdfunding, blockchain venture capital, blockchain seed funding',
}

export default function RootLayout ({
  children,
}: {
  children: ReactNode;
}) {
  const initialState = cookieToInitialState(
    config,
    headers().get('cookie'),
  )
  return (
    <html lang="en" className={primaryFont.className}>
      <body className={`bg-eerie-black`}>
        <Suspense>
          <Providers initialState={initialState}>
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
