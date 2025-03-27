import { createConfig, EVM } from "@lifi/sdk";
import { wagmiConfig } from "./wagmi";
import { switchChain } from "wagmi/actions";
import { getWalletClient } from "wagmi/actions";

export const lifiConfig = createConfig({
  integrator: "Your dApp/company name",
  providers: [
    EVM({
      getWalletClient: () => getWalletClient(wagmiConfig),
      switchChain: async (chainId) => {
        const chain = await switchChain(wagmiConfig, {
          chainId: chainId,
        });
        return getWalletClient(wagmiConfig, { chainId: chain.id });
      },
    }),
  ],
  // We disable chain preloading and will update chain configuration in runtime
  preloadChains: false,
});
