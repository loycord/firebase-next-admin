import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
`;

export default props => <Image {...props} src="/static/logo.png" />;
