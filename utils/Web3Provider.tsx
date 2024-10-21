import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [mainnet],
        transports: {
            // RPC URL for each chain
            [mainnet.id]: http(
                `https://eth-mainnet.g.alchemy.com/v2/POHxWXIFrN0XTqmEZnPqqGVOhl6ife-3`,
            ),
        },

        // Required API Keys
        walletConnectProjectId: "42b7a7c7fa98125d70efe9ce6d8ea907",

        // Required App Info
        appName: "No Bananas",
    }),

);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};