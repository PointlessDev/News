import React, {Component} from 'react';
import {CloudDownload} from 'material-ui-icons';
import "./Loading.css";

const lines = [
  'Loading!',
  'FAKE NEWS',
  'Generating 100% legit stories',
  '10/10 not fake news ok',
  'Pointless for student rep'
];

export default class Loading extends Component {
  render() {
    return (<div className="Loading">
      <CloudDownload className="Loading-icon" style={{transform: 'scale(4)'}} />
      <p className="Loading-text">{lines[Math.floor(Math.random() * lines.length)]}</p>
    </div>)
  }
}