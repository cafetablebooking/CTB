import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '@ctb/auth-context';
import { Header } from '@ctb/header';
import { Footer } from '@ctb/footer';
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
      <div className="app">
        <Header />
        <main>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CustomApp;
