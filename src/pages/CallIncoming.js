import React from 'react';
import util from 'lib/util';

class CallIncoming extends React.Component {

    onCallEnd = () => {
        console.error('onCallEnd');
    };

    onAccept = (e) => {
        const acceptParams = {
            callOption: {
                audioEnabled: true,
                videoEnabled: true
            }
        };
        this.props.callCtx.accept(acceptParams);
    }

    onReject = (e) => {
        this.props.callCtx.reject();
    }

    render() {

        const callCtx = this.props.callCtx;
        const info = callCtx.makeInfo();

        return (
            <div id='CallIncoming'>
                {util.makeTable(info)}
                <p><button onClick={this.onAccept}>accept</button></p>
                <p><button onClick={this.onReject}>reject</button></p>
            </div>
        );

    }
};

export default CallIncoming;
