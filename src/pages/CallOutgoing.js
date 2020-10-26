import React from 'react';
import { observer } from 'mobx-react';
import util from 'lib/util';

class CallOutgoing extends React.Component {

    onCallEnd = () => {
        console.error('onCallEnd');
    };

    onCancel = (e) => {
        this.props.callCtx.cancel();
    }

    render() {

        const callCtx = this.props.callCtx;
        const info = callCtx.makeInfo();

        return (
            <div id='CallOutgoing'>
                {util.makeTextTable(info)}
                <p><button onClick={this.onCancel}>cancel</button></p>
            </div>
        );

    }
};

export default observer(CallOutgoing);
