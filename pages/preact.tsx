import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import 'isomorphic-unfetch';

import ActiveLink from '../components/ActiveLink';

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  stars: number;
  testTime: string;
}

export default class Preact extends React.Component<Props> {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://api.github.com/repos/developit/preact');
    const json = await res.json();
    return { stars: json.stargazers_count };
  }

  render() {
    return (
      <View>
        <p>Preact has {this.props.stars} ⭐️</p>
        <Link prefetch href="/">
          <a>I bet next has more stars (?)</a>
        </Link>
        <ActiveLink href="/">Home</ActiveLink>
      </View>
    );
  }
}
