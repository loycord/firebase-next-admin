import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

/**
 * ORDER: Base + typography > general layout + grid > page layout > components
 */
export default () => injectGlobal`
  ${reset}

  html {
    font-size: 62.5%;
  }


  body {
    line-height: normal;
  }
`;
