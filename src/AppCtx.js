import { makeObservable, observable, action, runInAction } from 'mobx';
import SendBirdCall from "sendbird-calls";

class AppCtx {
    blocking = false;
    page = 'Login';
    history = [];

    constructor() {
        makeObservable(this, {
            blocking: observable,
            page: observable,
            history: observable,
            login: action,
            updateHistory: action,
        })
    }

    async login(opt) {
        console.info('login:', opt);

        runInAction(() => { this.blocking = true; });

        SendBirdCall.init(opt.APP_ID);
        SendBirdCall.useMedia(true, true);

        const authOption = { userId: opt.USER_ID };
        if (opt.ACCESS_TOKEN) authOption.accessToken = opt.ACCESS_TOKEN;

        try {
            const user = await SendBirdCall.authenticate(authOption);
            console.log('login:authenticate ok:', user);

            await SendBirdCall.connectWebSocket();
            console.log('login:connectWebSocket ok');

            runInAction(() => { this.page = 'Main'; });
            this.updateHistory();
        }
        catch (e) {
            console.error('login:', e);
        }
        finally {
            runInAction(() => { this.blocking = false; });
        }
    }

    logout() {
        SendBirdCall.deauthenticate();
    }

    async updateHistory() {
        try {
            const params = {
                // myRole: 'dc_caller',
                // endResults: ['DECLINED', 'COMPLETED'],
                limit: 10,
            };
            const query = SendBirdCall.createDirectCallLogListQuery(params);
            const directCallLog = await query.next();
            runInAction(() => { this.history = directCallLog; });
        }
        catch (e) {
            console.error('updateHistory:', e);
        }
    }
}

export default AppCtx;
