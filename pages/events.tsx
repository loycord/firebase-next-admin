import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const View = styled.div`
  flex: 1;
  align-items: center;
  flex-direction: column;
`;

export default class extends React.Component {
  render() {
    return (
      <View>
        <Link href="/">
          <a>Home</a>
        </Link>
      </View>
    );
  }
}
