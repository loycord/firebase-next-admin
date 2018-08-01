import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Navigation } from '../customize/types';

const View = styled.header`
  grid-column: 2 / -1;
  grid-row: 0 / 1;
  box-shadow: 0 0.5rem 10rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  z-index: 9;
  padding: 0 3rem;
`;
const NavBar = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
  align-items: center;
`;

interface NavLinkProps {
  isActive: boolean;
  theme?: any;
}

const NavLink = styled.a`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ isActive, theme: { colors } }: NavLinkProps) =>
    isActive ? colors.PRIMARY : colors.DISABLE};

  margin: 0 2rem;
  padding: 2rem 0;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    color: ${({ theme: { colors } }) => colors.PRIMARY};
  }
`;

interface Props {
  pathname: string;
  data?: Navigation[];
}

class AppBar extends React.PureComponent<Props> {
  render() {
    const { pathname = '/', data } = this.props;
    const pathArr = pathname.split('/');
    const rootPathname = pathArr[1];
    
    return (
      <View>
        <NavBar>
          {data &&
            data.map(link => (
              <Link key={link.name} href={link.pathname}>
                <NavLink isActive={link.pathname === '/' + rootPathname}>
                  {link.name}
                </NavLink>
              </Link>
            ))}
        </NavBar>
      </View>
    );
  }
}

export default AppBar;
