import React from 'react';
import App, { Container } from 'next/app';
import withStyle from '../styles';

class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withStyle(MyApp);