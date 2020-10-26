import { makeObservable, observable, action } from 'mobx';
import SendBirdCall from "sendbird-calls";

class CallCtx {

    constructor() {
        this.call = null;
        this.remoteUser = null;
        this.page = 'CallDial';

        makeObservable(this, {
            remoteUser: observable,
            page: observable,
            dial: action,
            resetIncoming: action,
            endPage: action,
            onEstablished: action,
        })
    }

    //-------------------------------------------------------------------------
    // outgoing
    //-------------------------------------------------------------------------

    dial(dialParams) {
        this.initCall(SendBirdCall.dial(dialParams, this.onDial));
        this.page = 'CallOutgoing';
    }

    onDial = (call, error) => {
        if (error) {
            console.error('Dialing failed', error);
        }
        else {
            this.remoteUser = this.call.remoteUser;
            console.debug('Dialing succeeded');
        }
    };

    cancel() {
        this.call.end();
    }

    //-------------------------------------------------------------------------
    // incoming
    //-------------------------------------------------------------------------

    resetIncoming(call) {
        this.initCall(call);
        this.page = 'CallIncoming';
    }

    accept(acceptParams) {
        this.call.accept(acceptParams);
        this.page = 'Call';
    }

    reject() {
        this.call.end();
    }

    //-------------------------------------------------------------------------
    // common
    //-------------------------------------------------------------------------

    endPage() {
        this.page = 'CallEnd';
    }

    clear() {
        this.call = null;
        this.remoteUser = null;
        this.page = 'CallDial';
    }

    initCall(call) {
        this.call = call;
        this.remoteUser = call.remoteUser;

        this.call.onEstablished = this.onEstablished;
        this.call.onConnected = (call) => {
            console.error('call:onConnected');
        };
        this.call.onEnded = (call) => {
            console.error('call:onEnded');
            this.endPage();
        };
        this.call.onRemoteAudioSettingsChanged = (call) => {
            console.error('call:onRemoteAudioSettingsChanged');
        };
        this.call.onRemoteVideoSettingsChanged = (call) => {
            console.error('call:onRemoteVideoSettingsChanged');
        };
    }

    onEstablished = (call) => {
        console.debug('call:onEstablished');
        this.page = 'CallActive';
    };

    end() {
        this.call.end();
    }

    makeInfo() {
        const info = {
            callId: this.call.callId,
            isVideoCall: this.call.isVideoCall,
        };

        const remoteUser = this.remoteUser;
        if (remoteUser) {
            info.nickname = remoteUser.nickname;
            info.userId = remoteUser.userId;
        }

        return info;
    }

}

export default CallCtx;
