'use client'

import { 
  ReactNode, useEffect,
} from "react";
import { 
  QueryClient, 
  QueryClientProvider,
} from "@tanstack/react-query";
import { 
  RainbowKitProvider, 
  getDefaultConfig,
  darkTheme,
  Chain,
} from '@rainbow-me/rainbowkit'
import { 
  type State, 
  http,
  WagmiProvider,
} from "wagmi";
// import { polygonAmoy } from 'wagmi/chains'

const buildbear = {
  id: 21308,
  name: 'Miamor',
  nativeCurrency: { 
    name: 'Miamor', 
    symbol: 'MIAMOR', 
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.buildbear.io/sensitive-omegared-16749c8d'] },
  },
  // blockExplorers: {
  //   default: { 
  //     name: 'SnowTrace', 
  //     url: 'https://snowtrace.io',
  //   },
  // },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'Web3It.AI',
  projectId: '9c501b5f82295e29fb3a0b4eb14dab53',
  chains: [
    // polygonAmoy, 
    buildbear,
  ],
  transports: {
    // [polygonAmoy.id]: http(),
    [buildbear.id]: http(),
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
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}