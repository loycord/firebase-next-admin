import styled from 'styled-components';

export const Button = styled.button`
  padding: 1rem 3rem;
  font-size: 1.6rem;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  margin: 2rem;
  background-color: ${props => props.theme.colors.PRIMARY};
  color: #fff;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.PRIMARY_DARK};
    cursor: pointer;
  }

  &:active {
    background-color: ${props => props.theme.colors.PRIMARY_LIGHT};
    cursor: pointer;
  }
`;
