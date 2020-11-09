import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { PageTransition } from 'next-page-transitions';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import NavBar from '../components/NavBar';

class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const theme = createMuiTheme({
      palette: {
        primary: { main: '#2fa200' },
      },
    });

    return (
      <>
        <CssBaseline />
        <Head>
          <title>Beer Calculator</title>
          <link href="/favicon.ico" rel="icon" />
        </Head>
        <ThemeProvider theme={theme}>
          <NavBar />
          <PageTransition
            classNames="page-transition"
            key={router.route}
            timeout={300}
          >
            <Component {...pageProps} />
          </PageTransition>
        </ThemeProvider>
        <style global jsx>{`
          .page-transition-enter {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity 300ms, transform 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
      </>
    );
  }
}

export default CustomApp;
