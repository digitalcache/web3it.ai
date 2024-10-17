'use client'

import { ReactNode } from "react";
import { 
  QueryClient, 
  QueryClientProvider,
} from "@tanstack/react-query";
import { 
  RainbowKitProvider, 
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import { 
  type State, 
  http,
  WagmiProvider,
} from "wagmi";
import { polygonAmoy } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: '9c501b5f82295e29fb3a0b4eb14dab53',
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export function Providers ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: State | undefined;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}