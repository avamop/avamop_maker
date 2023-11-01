import React from 'react'
import { ReactNode } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`

const Header = styled.header`
  padding: 20px 0;
  background-color: #333;
  color: #fff;
`

const Footer = styled.footer`
  padding: 20px 0;
  background-color: #333;
  color: #fff;
`

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header>My Blog</Header>
    <Container>{children}</Container>
    <Footer>&copy; {new Date().getFullYear()} My Blog</Footer>
  </>
)

export default Layout