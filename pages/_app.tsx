import type { AppProps } from 'next/app';

import { SnackbarProvider } from 'notistack';

import { EntriesProvider } from '../context/entries';
import { UIProvider } from '../context/ui';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}

export default MyApp
