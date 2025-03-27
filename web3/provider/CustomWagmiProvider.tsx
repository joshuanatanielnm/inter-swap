import { wagmiConfig } from "@/config/wagmi";
import { config } from "@lifi/sdk";
import { ChainType } from "@lifi/sdk";

import { getChains } from "@lifi/sdk";
import { useSyncWagmiConfig } from "@lifi/wallet-management";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { PropsWithChildren } from "react";
import { CreateConnectorFn, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";

// List of Wagmi connectors
const connectors: CreateConnectorFn[] = [injected()];

export const CustomWagmiProvider: FC<PropsWithChildren> = ({ children }) => {
  // Load EVM chains from LI.FI API using getChains action from LI.FI SDK
  const { data: chains } = useQuery({
    queryKey: ["chains"] as const,
    queryFn: async () => {
      const chains = await getChains({
        chainTypes: [ChainType.EVM],
      });
      // Update chain configuration for LI.FI SDK
      config.setChains(chains);
      return chains;
    },
  });

  // Synchronize fetched chains with Wagmi config and update connectors
  useSyncWagmiConfig(wagmiConfig, connectors, chains);

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      {children}
    </WagmiProvider>
  );
};
