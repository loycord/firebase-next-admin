import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './themes';
import baseStyles from './base';

export default WarrapedComponent => {
  return class extends React.Component {
    render() {
      baseStyles();
      return (
        <ThemeProvider theme={theme}>
          <WarrapedComponent {...this.props} />
        </ThemeProvider>
      );
    }
  };
};
