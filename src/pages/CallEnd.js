import React from 'react';
import util from 'lib/util';

function CallEnd(props) {

    const callCtx = props.callCtx;
    const info = callCtx.makeInfo();

    const call = callCtx.call;
    const title = `[ended] ${call.endResult}`;

    return (
        <div id='CallEnd'>
            <p>{title}</p>

            {util.makeTextTable(info)}

            <p><button onClick={e => props.callCtx.clear()}>close</button></p>
        </div >
    );

};

export default CallEnd;
