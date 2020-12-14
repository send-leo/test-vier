import React from 'react';
import { observer } from 'mobx-react'

import CallDial from './CallDial.js';
import CallCtx from "./CallCtx.js";
import CallActive from './CallActive.js';
import CallOutgoing from './CallOutgoing.js';
import CallIncoming from './CallIncoming.js';
import CallEnd from './CallEnd.js';
import CallHistory from './CallHistory.js';
import SendBirdCall from "sendbird-calls";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.callCtx = new CallCtx(props.appCtx);

        this.pages = {

            'CallDial': <CallDial callCtx={this.callCtx} />,
            'CallOutgoing': <CallOutgoing callCtx={this.callCtx} />,
            'CallIncoming': <CallIncoming callCtx={this.callCtx} />,
            'CallActive': <CallActive callCtx={this.callCtx} />,
            'CallEnd': <CallEnd callCtx={this.callCtx} />,
        };
    }

    componentDidMount() {
        SendBirdCall.addListener('1', {
            onRinging: this.onRinging,
        });
    }

    onRinging = (call) => {

        if (call.isEnded) {
            this.callCtx.endPage();
        }
        else {
            const currentCall = this.callCtx.call;
            if (!currentCall || currentCall.isEnded) {
                this.callCtx.resetIncoming(call);
            }
            else {
                console.error('onRinging : busy!!!');
                call.end();
            }
        }
    }

    render() {
        const pageName = this.callCtx.page;
        const titleStyle = {
            textAlign: 'center',
            border: '3px solid green',
            padding: '10px'
        };

        return (
            <div id='Main'>
                <div style={titleStyle}>
                    {pageName}
                </div>
                <div>
                    {this.pages[pageName]}
                </div>
                <div>
                    <CallHistory appCtx={this.props.appCtx} />
                </div>
            </div>
        );
    }
};

export default observer(Main);
