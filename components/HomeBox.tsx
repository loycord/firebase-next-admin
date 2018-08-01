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
  box-shadow: 0.5rem 0.5rem 2rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.4)};
`;

export default ({ children }) => (
  <Link href="/">
    <HomeBox>
      {children}
    </HomeBox>
  </Link>
);
