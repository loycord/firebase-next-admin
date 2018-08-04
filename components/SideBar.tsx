import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Navigation } from '../customize/types';

const View = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / -1;
  box-shadow: 0.5rem 0 1rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.1)};
  z-index: 8;
  background-color: ${({ theme: { colors } }) => colors.WHITE};

  animation: ${({ theme: { ani } }) => ani.moveInLeft} 0.8s
    cubic-bezier(0, 0.48, 0, 0.99);

  ${({ theme: { media } }) => media.phone`
    grid-column: 1 / -1;
    grid-row: 3 / 4;
  `};
`;
const NavBar = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  height: 100%;

  ${({ theme: { media } }) => media.phone`
    max-width: 100vw;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    
    ::-webkit-scrollbar {
      height: 5px;
    }
  `};
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
  color: ${({ isActive, theme: { colors } }) =>
    isActive ? colors.PRIMARY : colors.DISABLE};
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
    return `background-color: ${utils.rgba(colors.PRIMARY, 0.15)}`;
  }};

  :hover {
    box-shadow: 0 0.5rem 1rem
      ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
    background-color: transparent;
  }
  :active {
    background-color: ${({ theme: { colors } }) => colors.PRIMARY};
  }

  ${({ theme: { media } }) => media.phone`
    margin: 1rem 1.5rem;
  `};
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
                      color: 'currentColor'
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
