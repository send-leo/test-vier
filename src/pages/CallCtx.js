import { makeObservable, observable, action } from 'mobx';
import SendBirdCall from "sendbird-calls";

class CallCtx {

    constructor(appCtx) {
        this.appCtx = appCtx;
        this.call = null;

        this.remoteUser = null;
        this.page = 'CallDial';
        this.isLocalAudioEnabled = false;
        this.isLocalVideoEnabled = false;
        this.isRemoteAudioEnabled = false;
        this.isRemoteVideoEnabled = false;

        makeObservable(this, {
            // observable
            remoteUser: observable,
            page: observable,
            isLocalAudioEnabled: observable,
            isLocalVideoEnabled: observable,
            isRemoteAudioEnabled: observable,
            isRemoteVideoEnabled: observable,

            // action
            dial: action,
            resetIncoming: action,
            endPage: action,
            onEstablished: action,
            updateLocalAudioSettings: action,
            updateLocalVideoSettings: action,
            updateRemoteAudioSettings: action,
            updateRemoteVideoSettings: action,
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
        this.appCtx.updateHistory();
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
            console.debug('call:onRemoteAudioSettingsChanged');
            this.updateRemoteAudioSettings();
        };
        this.call.onRemoteVideoSettingsChanged = (call) => {
            console.debug('call:onRemoteVideoSettingsChanged');
            this.updateRemoteVideoSettings();
        };

        this.updateLocalAudioSettings();
        this.updateLocalVideoSettings();
        this.updateRemoteAudioSettings();
        this.updateRemoteVideoSettings();
    }

    setMicrophone(bOff) {
        if (bOff) {
            console.debug('muteMicrophone');
            this.call.muteMicrophone();
        }
        else {
            console.debug('unmuteMicrophone');
            this.call.unmuteMicrophone();
        }
        this.updateLocalAudioSettings();
    }
    setCamera(bOff) {
        if (bOff) {
            console.debug('stopVideo');
            this.call.stopVideo();
        }
        else {
            console.debug('startVideo');
            this.call.startVideo();
        }
        this.updateLocalVideoSettings();
    }

    onEstablished = (call) => {
        console.debug('call:onEstablished');
        this.page = 'CallActive';
    };
    updateLocalAudioSettings() {
        this.isLocalAudioEnabled = this.call.isLocalAudioEnabled;
    };
    updateLocalVideoSettings() {
        this.isLocalVideoEnabled = this.call.isLocalVideoEnabled;
    };
    updateRemoteAudioSettings() {
        this.isRemoteAudioEnabled = this.call.isRemoteAudioEnabled;
    };
    updateRemoteVideoSettings() {
        this.isRemoteVideoEnabled = this.call.isRemoteVideoEnabled;
    };

    end() {
        this.call.end();
    }

    makeInfo() {
        const info = {
            callId: this.call.callId,
            isVideoCall: `${this.call.isVideoCall}`,
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
