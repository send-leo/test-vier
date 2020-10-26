import React from 'react';
import { observer } from 'mobx-react'
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

        const call = callCtx.call;
        const isVideoCall = call.isVideoCall;

        const makeAudioButton = status =>
            <button onClick={e => this.props.callCtx.setMicrophone(status)}>{`${status}`}</button>;
        const makeVideoButton = status =>
            <button onClick={e => this.props.callCtx.setCamera(status)}>{`${status}`}</button>;

        let table = null;
        if (isVideoCall) {
            info.isLocalAudioEnabled = makeAudioButton(callCtx.isLocalAudioEnabled);
            info.isLocalVideoEnabled = makeVideoButton(callCtx.isLocalVideoEnabled);
            info.isRemoteAudioEnabled = `${callCtx.isRemoteAudioEnabled}`;
            info.isRemoteVideoEnabled = `${callCtx.isRemoteVideoEnabled}`;

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
        else {
            info.isLocalAudioEnabled = makeAudioButton(callCtx.isLocalAudioEnabled);
            info.isRemoteAudioEnabled = `${callCtx.isRemoteAudioEnabled}`;
        }

        info['=>'] = <button onClick={e => callCtx.end()}>end</button>;

        return (
            <div id='CallActive'>
                {util.makeTable(info)}
                {table}
            </div>
        );
    }
};

export default observer(CallActive);
