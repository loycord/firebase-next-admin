import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const HomeBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  background-color: ${({ theme: { colors } }) => colors.WHITE};

  box-shadow: 0.5rem 0.5rem 0.5rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.3)};
`;

export default ({ children }) => (
  <Link href="/">
    <HomeBox>
      {children}
    </HomeBox>
  </Link>
);
