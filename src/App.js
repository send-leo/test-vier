import React from 'react';

import AppCtx from 'AppCtx';
import { observer } from 'mobx-react'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import Login from 'pages/Login.js';
import Main from 'pages/Main.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.appCtx = new AppCtx();
    this.pages = {
      'Login': (<Login appCtx={this.appCtx} />),
      'Main': (<Main appCtx={this.appCtx} />),
    }
  }

  render() {
    const appCtx = this.appCtx;
    const page = this.pages[appCtx.page];

    return (
      <div id="App">
        <BlockUi tag="div" blocking={appCtx.blocking}>
          {page}
        </BlockUi>
      </div>
    );
  }
};

export default observer(App);
