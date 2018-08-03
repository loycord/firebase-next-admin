import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import 'isomorphic-unfetch';
import moment from 'moment';
import { FaUser } from 'react-icons/fa';

import { Title, LargeBody, Body } from '../../styles/ui';

const View = styled.div`
  padding: 1.5rem 3rem;
`;
const Card = styled.div`
  box-shadow: 0 0.2rem 0.5rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  margin: 1.5rem 0;
  background-color: ${({ theme: { colors } }) => colors.WHITE};
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
`;
const CardHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: ${({ theme: { colors } }) => colors.LIGHT_GRAY};
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
        <Body>Firebase user</Body>
        {users &&
          users.map(user => (
            <Card key={user.uid}>
              <CardHeader>
                <CardHeaderLeft>
                  {user.photoURL ? <ProfileImg src={user.photoURL} /> : <FaUser color="" />}
                  <LargeBody style={{ marginRight: '1rem' }}>{user.displayName}</LargeBody>
                  <Body size="1.2rem">{moment(user.metadata.creationTime).format('l')}</Body>
                </CardHeaderLeft>
                <Body style={{ justifySelf: 'flex-end' }}>{moment(user.metadata.lastSignInTime).fromNow()}</Body>
              </CardHeader>
            </Card>
          ))}
      </View>
    );
  }
}
