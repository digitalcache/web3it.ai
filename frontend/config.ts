import { 
  http, 
  createConfig,
  cookieStorage,
  createStorage,
} from 'wagmi'
import { 
  polygonAmoy,
} from 'wagmi/chains'

export const config = createConfig({
  chains: [polygonAmoy],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [polygonAmoy.id]: http(),
  },
})