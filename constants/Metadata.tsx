import Head from 'next/head'
import React from 'react'

const Metadata: React.FC = () => {
  return (
    <Head>
      <title>Scientia</title>
      <meta name="description" content="A Unified DoC EdTech Platform" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta
        name="theme-color"
        content="#000"
        media="(prefers-color-scheme: dark)"
      />
      <meta
        name="theme-color"
        content="#fff"
        media="(prefers-color-scheme: light)"
      />
    </Head>
  )
}

export default Metadata
