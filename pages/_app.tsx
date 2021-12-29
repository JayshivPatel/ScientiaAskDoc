import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { globalStyles, darkTheme } from '../styles/stitches.config'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{ dark: darkTheme.className, light: 'light' }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
