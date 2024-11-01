import { 
  http, 
  createConfig,
  cookieStorage,
  createStorage,
} from 'wagmi'
import { 
  polygon,
} from 'wagmi/chains'
export const config = createConfig({
  chains: [
    polygon,
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [polygon.id]: http(),
  },
})