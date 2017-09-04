import React, { Component } from 'react';
import './Header.css';
import {TrendingUp} from 'material-ui-icons';
import {lightBlue} from 'material-ui/colors';
import Typeography from 'material-ui/Typography';
import Live from "./Live";

class Header extends Component {
  render() {
    return (
      <div className="Header-wrapper" style={{background: lightBlue[500]}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Typeography type="display4">
            <span className="Header-icon-wrapper"><TrendingUp style={{transform: 'scale(4)'}} /></span>
            Pointless News
          </Typeography>
          <Live />
        </div>
        <Typeography type="headline">All the news you need, and even more that you don't.</Typeography>
      </div>
    );
  }
}

export default Header;
