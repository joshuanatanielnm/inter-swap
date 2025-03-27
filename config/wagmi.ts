import { createClient } from "viem";
import { http, createConfig, Config } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const wagmiConfig: Config = createConfig({
  chains: [mainnet, sepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
