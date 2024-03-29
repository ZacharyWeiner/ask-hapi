/* eslint-disable @next/next/no-script-component-in-head */
import { useState } from 'react';
import Script from 'next/script';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Footer from '../components/Footer/Footer.component';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  const footerData = [
    {
      title: 'Group1',
      links: [
              { label: 'Sub1', link: '/images' },
            ],
    }];
  return (
    <>
      <Head>
        <title>ASK HAPI</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="https://slavettes-layers.s3.amazonaws.com/hapi/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ask_hapi" />
        <meta name="twitter:creator" content="@ask_hapi" />
        <meta property="og:title" content="Ask HAPI" />
        <meta property="og:description" content="AI For Everyone" />
        <meta property="og:image" content="https:/www.askhapi.com/hapi-neutral.png" />

      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <Component {...pageProps} />
            <Footer links={[{ label: 'Home', link: '/' },
                            { label: 'Generate Pics', link: '/images' },
                            { label: 'Patterns', link: '/pattern' },
                            { label: 'Waifu', link: '/waifu' },
                            { label: 'Funko', link: '/funko' },
                            { label: 'Ai FaceFix', link: '/upgrade-face' },
                            { label: 'Ai Story Ideas', link: '/scene-generator' },
                            { label: 'Age Face', link: '/age-picture' },
                            { label: 'Auto Green Screen', link: '/green-screen' },
                            { label: 'FAQ', link: '/faq' },
                            ]}
            />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
