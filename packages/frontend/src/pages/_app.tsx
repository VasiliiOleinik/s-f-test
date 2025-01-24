import React from 'react';
import client from '@/apollo/client';
import { ApolloProvider } from '@apollo/client';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '@/utils/styles.css';

export default function App({ Component, pageProps }: any) {
  return (
    <Theme>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Theme>
  );
}
