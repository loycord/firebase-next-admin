import styled from 'styled-components';

export const BasicView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80rem;
  padding: 3rem;
  margin: 0 auto;

  ${({ theme: { media } }) => media.phone`
    max-width: 100%;
    padding: 2rem;
  `};
`;

export const FixedModalView = styled.div`
  position: fixed;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface NoticeViewProps {
  time?: number;
  theme?: any;
}
export const NoticeView = styled.div`
  padding: 2rem 4rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;

  font-size: 4rem;
  color: #fff;
  font-weight: 600;
  opacity: 0;

  animation: ${({ theme: { ani } }: NoticeViewProps) => ani.fadeInOut}
    ${({ time = 1000 }: NoticeViewProps) => `${time}ms`};
`;
