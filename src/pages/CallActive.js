import React from 'react';
import util from 'lib/util';

class CallActive extends React.Component {

    componentDidMount() {
        const call = this.props.callCtx.call;
        if (call.isVideoCall) {
            call.setLocalMediaView(document.getElementById('local_video_element_id'));
            call.setRemoteMediaView(document.getElementById('remote_video_element_id'));
        }
    }

    render() {

        const callCtx = this.props.callCtx;
        const info = callCtx.makeInfo();

        let table = null;
        const isVideoCall = callCtx.call.isVideoCall;
        if (isVideoCall) {
            const local_video_style = {
                margin: '10px',
                border: '4px dashed #bcbcbc',
                width: '320px',
                height: '240px',
            };

            const remote_video_style = {
                margin: '10px',
                border: '4px dashed #bcbcbc',
                width: '320px',
                height: '240px',
            };

            const elements = {
                local: (
                    <video className='a' id='local_video_element_id' autoPlay={true} style={local_video_style}>
                    </video>
                ),
                remote: (
                    <video className='a' id='remote_video_element_id' autoPlay={true} style={remote_video_style}>
                    </video>
                ),
            }

            table = util.makeTable(elements);
        }

        return (
            <div id='CallActive'>
                {util.makeTextTable(info)}
                {table}
                <p><button onClick={e => callCtx.end()}>end</button></p>
            </div>
        );
    }
};

export default CallActive;
