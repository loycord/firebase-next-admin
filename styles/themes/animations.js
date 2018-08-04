import { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const moveInLeftSpring = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10rem) rotate(0deg);
  }

  80% {
    transform: translateX(1rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const moveInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10rem) rotate(0deg);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const moveInRightSpring = keyframes`
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }

  80% {
    transform: translateX(-1rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const moveInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const moveInBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const moveInTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-2rem);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const pulsate = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
`;

export default {
  fadeInOut,
  moveInLeft,
  moveInLeftSpring,
  moveInRight,
  moveInRightSpring,
  moveInBottom,
  moveInTop,
  pulsate
};
