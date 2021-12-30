import { Container, Footer, Logo } from '../styles/Layout.style'
import Image from 'next/image'
import React from 'react'
import Metadata from '../constants/Metadata'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Metadata />
      {children}
      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Logo>
            <Image src="/scientia.svg" alt="Scientia Logo" width={16} height={16} />
          </Logo>
        </a>
      </Footer>
    </Container>
  )
}

export default Layout
