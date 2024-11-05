import { 
  http, 
  createConfig,
  cookieStorage,
  createStorage,
} from 'wagmi'
import { 
  unichainSepolia,
} from 'wagmi/chains'
export const config = createConfig({
  chains: [
    unichainSepolia,
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [unichainSepolia.id]: http(),
  },
})