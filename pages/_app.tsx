import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
import withStyle from '../styles';

const StyledContainer = withStyle(Container);

const Layout = styled.div`
  display: grid;

  width: 100%;
  height: 100vh;

  grid-template-columns: 7rem 1fr;
  grid-template-rows: 7rem 1fr;
`;
const Navigator = styled.div`
  grid-column: 2 / -1;
  grid-row: 0 / 1;
  box-shadow: 0 5px 100px ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  z-index: 9;
`;
const Sidebar = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  box-shadow: 5px 0 100px ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  z-index: 10;
`;
const Main = styled.div`
  overflow-y: auto;
`;

class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyledContainer>
        <Layout>
          <Navigator />
          <Sidebar />
          <Main>
            <Component {...pageProps} />
          </Main>
        </Layout>
      </StyledContainer>
    );
  }
}

export default MyApp;
