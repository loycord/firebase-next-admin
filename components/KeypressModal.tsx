import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const KeypressView = styled.div`
  padding: 20px 40px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  font-size: 40px;
  color: #fff;
  font-weight: 600;
`;

interface State {
  key: string;
  keyCount: number;
}

class KeypressModal extends React.Component<{}, State> {
  handleKeypress: EventListenerOrEventListenerObject;

  constructor(props: any) {
    super(props);

    this.handleKeypress = (e: any) => {
      console.log(e);
      console.log(e.shiftKey);
      this.setState(prevState => ({
        key: e.key === ' ' ? 'Spacebar' : e.key,
        keyCount: prevState.keyCount + 1
      }));
    };

    this.state = {
      key: '',
      keyCount: 0
    };
  }

  componentDidMount() {
    addEventListener('keydown', this.handleKeypress);
  }

  componentWillUnmount() {
    removeEventListener('keydown', this.handleKeypress);
  }

  render() {
    if (this.state.key === '') return null;
    return (
      <Container>
        <KeypressView>{this.state.key}</KeypressView>
      </Container>
    );
  }
}

export default KeypressModal;
