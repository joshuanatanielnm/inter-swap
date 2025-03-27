import { getRoutes, RoutesRequest } from "@lifi/sdk";

interface GetEVMSwapRoutesProps {
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string;
  toTokenAddress: string;
  fromAmount: string;
}

export const getEVMSwapRoutes = async ({
  fromChainId,
  toChainId,
  fromTokenAddress,
  toTokenAddress,
  fromAmount,
}: GetEVMSwapRoutesProps) => {
  const routesRequest: RoutesRequest = {
    fromChainId,
    toChainId,
    fromTokenAddress,
    toTokenAddress,
    fromAmount,
  };

  const result = await getRoutes(routesRequest);
  const routes = result.routes;

  return routes;
};
