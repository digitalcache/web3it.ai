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
  title: 'Web3.It.AI',
  description: 'Translate ideas into Web3 projects',
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
