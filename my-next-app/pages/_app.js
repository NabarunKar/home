import Head from 'next/head';
import { Analytics } from '@vercel/analytics/next';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="/man.png" type="image/png" />
        <link rel="shortcut icon" href="/man.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
