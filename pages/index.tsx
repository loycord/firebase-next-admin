import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.p`
  font-size: 14px;
  color: blueviolet;
`;
const OnClickImage = styled.img`
  :hover {
    cursor: pointer;
  }
`;
interface Props {
  userAgent: string;
}

export default class extends React.Component<Props> {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  componentDidMount() {
    Router.prefetch('/events');
  }

  handler() {
    Router.push({ pathname: '/preact', query: { name: 'Zeit' } });
  }

  shallowRouting(shallow: boolean) {
    const href = '/?counter=10';
    const as = href;
    Router.push(href, as, { shallow });
    // shallow true -> getInitialProps not working.
    // shallow routing works only for same page URL changes. For an example, let's assume we have another page called "about", and you run this.
  }

  render() {
    return (
      <Container>
        <Link href="/static/thumbnail.png">
          <OnClickImage src="/static/thumbnail.png" alt="next good" />
        </Link>
        Hello World
        <Text>{this.props.userAgent}</Text>
        <Link prefetch href={{ pathname: 'preact', query: { name: 'Zeit' } }}>
          <a>here_preact</a>
        </Link>
        <Link
          prefetch
          href={{ pathname: 'preact', query: { name: 'Zeit' } }}
          replace
        >
          <a>here_preact_replace</a>
        </Link>
        <div>
          Click <span onClick={this.handler}>here</span> to read more
        </div>
        <Link href="/events">
          <a>events</a>
        </Link>
        <Link href="/keyboard">
          <a>keyboard</a>
        </Link>
        <button onClick={() => this.shallowRouting(true)}>
          Shallow Routing: OPTION[true]
        </button>
        <button onClick={() => this.shallowRouting(false)}>
          Shallow Routing: OPTION[false]
        </button>
      </Container>
    );
  }
}
