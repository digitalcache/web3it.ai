import {
  ReactNode,
  Suspense,
} from "react";
import { DM_Sans } from 'next/font/google';
import { Providers } from "@/utils/providers";
import { headers } from 'next/headers';
import { cookieToInitialState } from "wagmi";
import '@rainbow-me/rainbowkit/styles.css'
import { config } from "@/config";
import './globals.css'

const primaryFont = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-primaryFont',
});

export const metadata = {
  title: 'Web3It.AI | Innovative Crowdfunding Blockchain App for Early-Stage Enterprises',
  description: "Unlock your startup's potential with our cutting-edge crowdfunding blockchain application. Designed specifically for early-phase companies, our platform offers secure, transparent funding solutions to accelerate your growth. Join us and take your enterprise to new heights.",
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
