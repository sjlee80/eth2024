'use client';
import '@/styles/globals.scss';
import { config } from '@/config/wagmi';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import Inner from '@/app';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Inner>{children}</Inner>
            </QueryClientProvider>
          </Provider>
        </WagmiProvider>
      </body>
    </html>
  );
}
