import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Headline, Body, BasicView } from '../styles/ui';

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
      <BasicView>
        <Headline>Manage your website quickly and easily with Next.js</Headline>
        <Body>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          fugit saepe, reprehenderit fuga aperiam repellendus in sint. Magnam,
          beatae illum, rem sed repellendus incidunt temporibus error, quis
          harum corrupti possimus.
        </Body>
        <Body>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem,
          quaerat. Mollitia rem cumque dolor doloribus explicabo eveniet fuga
          aliquid? Voluptatem ex quis pariatur ipsum eligendi porro voluptate
          nemo facere nobis. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Deleniti, dolores quibusdam? Ipsam vitae praesentium adipisci
          velit illo sequi minus earum incidunt tempora repudiandae natus
          consequuntur quos, reprehenderit, voluptatem amet? Ullam?
        </Body>
      </BasicView>
    );
  }
}
