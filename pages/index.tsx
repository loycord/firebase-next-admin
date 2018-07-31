import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BigText = styled.p`
  font-size: 5rem;
`;

interface Props {
  userAgent: string;
}

export default class extends React.Component<Props> {
  static async getInitialProps({ pathname, req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent, pathname: (req && req.url) || pathname };
  }

  // handler() {
  //   Router.push({ pathname: '/preact', query: { name: 'Zeit' } });
  // }

  // shallowRouting(shallow: boolean) {
  //   const href = '/?counter=10';
  //   const as = href;
  //   Router.push(href, as, { shallow });
  //   // shallow true -> getInitialProps not working.
  //   // shallow routing works only for same page URL changes. For an example, let's assume we have another page called "about", and you run this.
  // }

  render() {
    return (
      <Container>
        Hello World
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
        <BigText>Big TEXT!</BigText>
      </Container>
    );
  }
}
