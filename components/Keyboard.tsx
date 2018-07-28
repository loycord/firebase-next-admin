import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.2);
`
const KeyboardView = styled.div`
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(5, 1fr);
`

const Key = styled.div`
  padding: 10px;
  background-color: orangered;
`

// ` 1 2 3 4 5 6 7 8 9 0 - = back 14
// tab q w e r t y u i o p [ ] \ 14
// ca a s d f g h j k l ; ' enter 13
// shift z x c v b n m , . / sh 12
// con opt comm space comm opt l tb r 9


class Keyboard extends React.PureComponent {
  render() {
    return (
      <Container>
        <KeyboardView>
          <Key>`</Key>
          <Key>1</Key>
          <Key>2</Key>
          <Key>3</Key>
          <Key>4</Key>
        </KeyboardView>
      </Container>
    );
  }
}

export default Keyboard;
