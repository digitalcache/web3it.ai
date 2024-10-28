import { 
  http, 
  createConfig,
  cookieStorage,
  createStorage,
} from 'wagmi'
import { 
// polygonAmoy,
} from 'wagmi/chains'
import { type Chain } from 'viem'

export const buildbear = {
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
} as const satisfies Chain

export const config = createConfig({
  chains: [
    // polygonAmoy, 
    buildbear,
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    // [polygonAmoy.id]: http(),
    [buildbear.id]: http(),
  },
})