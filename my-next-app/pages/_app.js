import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/man.png" type="image/png" />
        <link rel="shortcut icon" href="/man.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
