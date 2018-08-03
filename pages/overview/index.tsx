import React from 'react';
import { Headline, BasicView } from '../../styles/ui';

export default class extends React.Component {
  static async getInitialProps({ pathname, req }) {
    return { pathname: (req && req.url) || pathname };
  }
  
  render() {
    return (
      <BasicView>
        <Headline>Firebase Overview</Headline>
      </BasicView>
    );
  }
}
