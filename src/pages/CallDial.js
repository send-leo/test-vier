import React from 'react';
import util from 'lib/util';

class CallDial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CALLEE_ID: '',
        };
    }

    onChange = (e) => {
        const id = e.target.id;
        this.setState({
            [id]: e.target.value.trim()
        });
    };

    dial(isVideoCall) {
        const dialParams = {
            userId: this.state.CALLEE_ID,
            isVideoCall,
            callOption: {
                audioEnabled: true,
                videoEnabled: isVideoCall,
            }
        };
        this.props.callCtx.dial(dialParams);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.dial(true);
    };

    render() {
        const elements = {
            CALLEE_ID: (
                <input type='text'
                    id='CALLEE_ID'
                    value={this.state.CALLEE_ID}
                    onChange={this.onChange}
                    required={true}
                    autoComplete='on'
                />
            ),
            video: (
                <button type='submit'>video call</button>
            ),
            audio: (
                <button type='button' onClick={e => this.dial(false)}>audio call</button>
            ),
        };

        return (
            <div id='CallDial'>
                <form onSubmit={this.onSubmit}>
                    {util.makeTable(elements)}
                </form>
            </div>
        );
    }
};

export default CallDial;
