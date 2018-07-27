import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.p`
  font-size: 14px;
  color: blueviolet;
`

interface Props {
  userAgent: string;
}

export default class extends React.Component<Props> {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }
  render() {
    return (
      <Container>
        <img src="/static/thumbnail.png" alt="next good" />
        Hello World
        <Text>{this.props.userAgent}</Text>
      </Container>
    );
  }
}