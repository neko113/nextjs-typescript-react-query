import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@emotion/react';

import { GlobalStyle } from '@/styles/global-style';
import { theme } from '@/styles/theme';
import LayoutComponent from '@/components/Layout';
import { wrapper } from '@/app/store';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default wrapper.withRedux(MyApp);
