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
  background-color: #f7faff;

  grid-template-columns: 7rem 1fr;
  grid-template-rows: 7rem 1fr;

  ${({ theme: { media } }) => media.phone`
    grid-template-rows: 5rem 5rem 6rem 1fr;
    grid-template-columns: 1fr;
  `};
`;

interface MainProps {
  isSideBar: boolean;
}
const Main = styled.div`
  overflow-y: auto;
  max-width: 100%;
  ${({ isSideBar }: MainProps) => !isSideBar && 'grid-column: 1 / -1;'};
  ${({ isSideBar, theme: { media }}) => media.phone`
    grid-column: 1 / -1;
    ${!isSideBar && 'grid-row: 3 / -1'};
  `};
`;

class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    const { pathname = '/' } = pageProps;
    const pathArr = pathname.split('/');
    const rootPathname = pathArr[1];
    const regPath = new RegExp('^/' + rootPathname);

    let isSideBar = false;
    if (rootPathname !== '') {
      let findNavigation = navigation.find(page => regPath.test(page.pathname));
      isSideBar = !!findNavigation && findNavigation.app.length > 0;
    }

    return (
      <StyledContainer>
        <Layout>
          <HomeBox>
            <Logo />
          </HomeBox>
          <AppBar pathname={pageProps.pathname} data={navigation} />
          {isSideBar && (
            <SideBar pathname={pageProps.pathname} data={navigation} />
          )}
          <Main isSideBar={isSideBar}>
            <Component {...pageProps} />
          </Main>
        </Layout>
      </StyledContainer>
    );
  }
}

export default MyApp;
