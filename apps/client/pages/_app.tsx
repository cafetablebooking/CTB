import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '@ctb/auth-context';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../components/ThemeProviders/LightThemeProvider';
import { ClientContextProvider } from '../contexts/ClientContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_CLIENT_STRIPE_PUBLISHABLE_KEY
);

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
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
    </Elements>
  );
}

export default CustomApp;
