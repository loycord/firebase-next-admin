import { css } from 'styled-components';

const sizes = {
  phone: 600,
  tabPort: 900,
  tabLand: 1200,
  bigDesktop: 1800
};

export default Object.keys(sizes).reduce((acc, label) => {
  const minmax = label === 'bigDesktop' ? 'min-width' : 'max-width';
  acc[label] = (...args) => css`
    @media only screen and (${minmax}: ${sizes[label] / 16}em),
           only screen and (hover: none) {
      ${css(...args)};
    }
    `;
  return acc;
}, {});
