import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import GlobalStyle from '../components/GlobalStyle';
import 'antd/dist/antd.css';
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <NextNprogress color="#2AA7DF" height={2} />
    </>
  );
}

export default MyApp;