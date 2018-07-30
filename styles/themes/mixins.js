import { css } from 'styled-components';

const clearfix = css`
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const backgroundImageGradient = css`
  background-image: ${props => {
    let gradient;
    const { linearStart, linearEnd } = props;
    const { COLOR_LINEAR_START, COLOR_LINEAR_END } = props.theme;
    if (linearStart && linearEnd) {
      gradient = `${props.linearStart}, ${props.linearEnd}`;
    } else if (COLOR_LINEAR_START && COLOR_LINEAR_END) {
      gradient = `${COLOR_LINEAR_START}, ${COLOR_LINEAR_END}`;
    } else {
      gradient = 'rgba(214, 214, 214, 0.8), rgba(56, 56, 56, 0.8)';
    }

    return `
      linear-gradient(to right bottom, ${gradient}),
      url(${props.backImg});
    `;
  }};
`;

const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default {
  clearfix,
  backgroundImageGradient,
  absoluteCenter
};
