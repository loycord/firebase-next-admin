import styled, { css } from 'styled-components';

const FONT = '#424242';
const FONT_LIGHT = '#9A9A9A';

const fontConfig = css`
  color: ${FONT};
  font-family: 'Gothic A1', sans-serif;
`;

export const Headline = styled.h1`
  ${fontConfig};
  padding: 2rem;
  font-size: 4rem;
  font-weight: 900;
`;

export const Title = styled.h2`
  ${fontConfig};
  padding: 1.5rem;
  font-size: 3rem;
  font-weight: 800;
`;

export const Subheader = styled.h3`
  ${fontConfig};
  color: ${FONT_LIGHT};
  padding: 1rem;
  font-size: 2rem;
  font-weight: 400;
`;

export const LargeBody = styled.p`
  ${fontConfig};
  padding: 0.8rem;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const Body = styled.p`
  ${fontConfig};
  color: ${props => (props.white ? '#fff' : FONT)};
  padding: 0.8rem;
  font-size: 1.6rem;
  font-weight: 300;
`;

export const SecondaryBody = styled.p`
  ${fontConfig};
  padding: 0.8rem;
  font-size: 1.6rem;
  font-weight: 300;
`;

export const GamjaTitle = styled.h1`
  font-size: 6rem;
  font-family: 'Gamja Flower', cursive;
  color: ${props => (props.white ? '#fff' : FONT)};
`;

export const GamjaBody = styled.p`
  font-size: 5rem;
  font-family: 'Gamja Flower', cursive;
  color: ${props => (props.white ? '#fff' : FONT)};
`;
