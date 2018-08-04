import React from 'react';
import styled from 'styled-components';
import 'isomorphic-unfetch';
import moment from 'moment';
import { FaUser, FaClone } from 'react-icons/fa';

import { copyClip } from '../../lib/utils/documents';

import {
  Title,
  LargeBody,
  Body,
  FixedModalView,
  NoticeView
} from '../../styles/ui';

const View = styled.div`
  padding: 1.5rem 3rem;
`;
const Card = styled.div`
  box-shadow: 0 0.2rem 0.5rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  margin: 1.5rem 0;
  background-color: ${({ theme: { colors } }) => colors.WHITE};
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0.2rem 0.8rem
      ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.9)};
  }
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;

  ${({ theme: { media } }) => media.phone`
    flex-direction: column;
  `};
`;
const CardHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const CardHeaderRight = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileView = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
  color: ${({ theme: { colors } }) => colors.MID_GRAY};
  background-color: ${({ theme: { colors } }) => colors.LIGHT_GRAY};
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const ClickIconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  cursor: pointer;

  :hover {
    color: ${({ theme: { colors } }) => colors.PRIMARY};
  }
  :active {
    color: ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.8)};
  }
`;

interface Props {
  pathname: string;
  users: any;
}
interface State {
  isNotice: boolean;
}

export default class extends React.Component<Props, State> {
  handleNoticeView: (callback: Function) => void;
  noticeViewTimer: any;
  viewTime: number;

  static async getInitialProps({ pathname, req }) {
    const res = await fetch('http://localhost:3000/api/v1/users');
    const json = await res.json();

    return { pathname: (req && req.url) || pathname, users: json };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isNotice: false
    };

    this.viewTime = 1200;

    this.handleNoticeView = callback => {
      clearTimeout(this.noticeViewTimer);

      callback();

      this.setState({ isNotice: true });
      this.noticeViewTimer = setTimeout(() => {
        this.setState({ isNotice: false });
      }, this.viewTime);
    };
  }

  render() {
    const { users } = this.props;
    return (
      <View>
        <Title>User List</Title>
        <Body>Firebase user</Body>
        {users &&
          users.map(user => (
            <Card key={user.uid}>
              <CardHeader>
                <CardHeaderLeft>
                  {user.photoURL ? (
                    <ProfileView>
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={user.photoURL}
                      />
                    </ProfileView>
                  ) : (
                    <ProfileView>
                      <FaUser size={30} color="currentColor" />
                    </ProfileView>
                  )}
                  <LargeBody style={{ marginRight: '1rem' }}>
                    {user.displayName}
                  </LargeBody>
                  <Body size="1.2rem">
                    {moment(user.metadata.lastSignInTime).fromNow()}
                  </Body>
                </CardHeaderLeft>
                <CardHeaderRight>
                  <Body size="1.2rem" style={{ marginRight: '1rem' }}>
                    {user.uid}
                  </Body>
                  <ClickIconButton
                    onClick={() =>
                      this.handleNoticeView(() => copyClip(user.uid))
                    }
                  >
                    <FaClone size={20} color="currentColor" />
                  </ClickIconButton>
                </CardHeaderRight>
              </CardHeader>
            </Card>
          ))}
        {this.state.isNotice && (
          <FixedModalView>
            <NoticeView time={this.viewTime}>Copied</NoticeView>
          </FixedModalView>
        )}
      </View>
    );
  }
}
