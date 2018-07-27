import React from 'react';
import cowsay from 'cowsay-browser';

console.log('baby');

export default class extends React.Component {
  render() {
    console.log('hi there');
    const a = 3;
    const b = 5;
    const c = a + b;

    return <pre>{cowsay.say({ text: 'hi there!' })}</pre>;
  }
}
