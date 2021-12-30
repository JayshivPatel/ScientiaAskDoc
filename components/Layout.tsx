import { Container, Footer, Logo } from '../styles/Layout.style'
import Head from 'next/head'
import Image from 'next/image'

interface LayoutProps {
  children: React.ReactNode
}

// TODO: Move page metadata to a constants folder and add a title prop
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
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
      {children}
      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Logo>
            <Image
              src="/scientia.svg"
              alt="Scientia Logo"
              width={16}
              height={16}
            />
          </Logo>
        </a>
      </Footer>
    </Container>
  )
}

export default Layout
