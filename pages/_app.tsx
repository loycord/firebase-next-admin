import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
import withStyle from '../styles';
// components
import AppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import HomeBox from '../components/HomeBox';
// customize
import { navigation, Logo } from '../customize';

const StyledContainer = withStyle(Container);

const Layout = styled.div`
  display: grid;

  width: 100%;
  height: 100vh;

  grid-template-columns: 7rem 1fr;
  grid-template-rows: 7rem 1fr;
`;

interface MainProps {
  isHome: boolean;
}
const Main = styled.div`
  overflow-y: auto;
  ${({ isHome }: MainProps) => isHome && 'grid-column: 1 / -1;'};
`;

class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    const isHome = pageProps.pathname === '/';
    return (
      <StyledContainer>
        <Layout>
          <HomeBox>
            <Logo />
          </HomeBox>
          <AppBar pathname={pageProps.pathname} data={navigation} />
          {!isHome && (
            <SideBar pathname={pageProps.pathname} data={navigation} />
          )}
          <Main isHome={isHome}>
            <Component {...pageProps} />
          </Main>
        </Layout>
      </StyledContainer>
    );
  }
}

export default MyApp;
