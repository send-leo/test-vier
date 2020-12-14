import React from 'react';
import { observer } from 'mobx-react';

class CallHistory extends React.Component {
    constructor(props) {
        super(props);
        this.appCtx = props.appCtx;

        console.error('this.appCtx', this.appCtx)
    }

    update() {
        this.appCtx.updateHistory();
    };

    render() {
        const cols = [
            'callId',
            'callType',
            'duration',
            'endResult',
            // 'endedAt',
            // 'endedBy',
            // 'isActive',
            'isVideoCall',
            // 'startedAt',
            // 'userRole',
            // '_customItems',
            // '_isFromServer',
            // '_participants',
            // 'callee',
            // 'caller',
            // 'customItems',
            // 'isFromServer',
        ];

        const head = (
            <thead>
                <tr>
                    {cols.map((name, idx) => <th key={idx}>{name}</th>)}
                </tr>
            </thead>
        );
        const rows = this.appCtx.history.map((log) =>
            <tr key={log.callId}>
                {cols.map((name, idx) => <td key={idx}>{`${log[name]}`}</td>)}
            </tr>
        );

        return (
            <div id='CallHistory'>
                <table>
                    {head}
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button type='button' onClick={e => this.update()}>update</button>
            </div>
        );
    }
};

export default observer(CallHistory);
