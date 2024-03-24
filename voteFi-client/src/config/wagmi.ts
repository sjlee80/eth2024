import { http, createConfig } from 'wagmi';
import { sepolia, avalancheFuji, baseSepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [avalancheFuji, sepolia, baseSepolia],
  transports: {
    [avalancheFuji.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});
