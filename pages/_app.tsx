import React from 'react'
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { AppContextProvider } from '../context/StateContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
    </AppContextProvider>
  )
}
