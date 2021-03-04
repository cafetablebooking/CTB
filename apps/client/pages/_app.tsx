import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '@ctb/auth-context';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../components/ThemeProviders/LightThemeProvider';
import { ClientContextProvider } from '../contexts/ClientContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Head>
        <title>Welcome to client!</title>
      </Head>
      <AuthContextProvider>
        <ClientContextProvider>
          <Header />
          <main style={{ top: '73.6px', position: 'relative' }}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </main>
          <Footer />
        </ClientContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default CustomApp;
