import React from 'react';
import KeyboardModal from '../components/KeypressModal';
import Keyboard from '../components/Keyboard';

export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <KeyboardModal />
        <Keyboard />
      </React.Fragment>
    );
  }
}
