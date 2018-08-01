import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import 'isomorphic-unfetch';

import { Title, Body } from '../../styles/ui';

const View = styled.div`
  padding: 1.5rem 3rem;
`;
const Card = styled.div`
  padding: 1.5rem;
  box-shadow: 0 0.2rem 0.5rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  margin: 1.5rem 0;
`;
const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.MID_GRAY};
`;

interface Props {
  pathname: string;
  users: any;
}

export default class extends React.Component<Props> {
  static async getInitialProps({ pathname, req }) {
    const res = await fetch('http://localhost:3000/api/v1/users');
    const json = await res.json();

    return { pathname: (req && req.url) || pathname, users: json };
  }

  render() {
    const { users } = this.props;
    console.log(users);
    return (
      <View>
        <Title>User List</Title>
        <Body>firebase user</Body>
        {users &&
          users.map(user => (
            <Card key={user.uid}>
              <ProfileImg src={user.photoURL} />
              {user.displayName}
            </Card>
          ))}
      </View>
    );
  }
}
