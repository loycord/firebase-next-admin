import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Navigation } from '../customize/types';
import colors from '../styles/themes/colors';

const View = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / -1;
  box-shadow: 0.5rem 0 10rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
  z-index: 10;

  animation: ${({ theme: { ani } }) => ani.moveInLeft} 1s;
`;
const NavBar = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

interface NavLinkBoxProps {
  isActive: boolean;
  theme?: any;
}

const NavLinkBox = styled.a`
  padding: 0.8rem;
  margin: 1.5rem 0;
  cursor: pointer;
  /* border: 1px solid; */
  border-radius: 1.4rem;
  transition: all 0.3s;
  box-shadow: none;
  ${({ isActive, theme: { colors, utils } }: NavLinkBoxProps) => {
    if (isActive) {
      return `
        box-shadow: 0 0.5rem 1rem ${utils.rgba(colors.PRIMARY, 0.3)};
        background-color: transparent;
      `;
    }
    return `background-color: ${utils.rgba(colors.PRIMARY, 0.1)}`;
  }};

  :hover {
    box-shadow: 0 0.5rem 1rem
      ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
    background-color: transparent;
  }
  :active {
    transform: scale(1.2);
  }
`;

interface Props {
  pathname: string;
  data?: Navigation[];
}

class SideBar extends React.PureComponent<Props> {
  render() {
    const { pathname = '/', data } = this.props;
    const pathArr = pathname.split('/');
    const rootPathname = pathArr[1];
    const regPath = new RegExp('^/' + rootPathname);

    let sidebar = null;
    if (rootPathname !== '') {
      sidebar = data.find(link => regPath.test(link.pathname));
    }

    return (
      <View>
        <NavBar>
          {sidebar &&
            sidebar.app.map(link => {
              const sidePathname = link.name.toLocaleLowerCase();
              const isActive = sidePathname === pathArr[pathArr.length - 1];
              return (
                <Link
                  key={link.name}
                  href={`${sidebar.pathname}/${sidePathname}`}
                >
                  <NavLinkBox isActive={isActive}>
                    {link.icon({
                      size: 25,
                      color: isActive ? colors.PRIMARY : colors.DISABLE
                    })}
                  </NavLinkBox>
                </Link>
              );
            })}
        </NavBar>
      </View>
    );
  }
}

export default SideBar;