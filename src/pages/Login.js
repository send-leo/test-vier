import React from 'react';
import util from 'lib/util';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            APP_ID: '',
            USER_ID: '',
            ACCESS_TOKEN: '',
        };
    }

    onChange = (e) => {
        const id = e.target.id;
        this.setState({
            [id]: e.target.value.trim()
        });
    };

    updateLink(link) {
        const base64 = link.split('/').pop();
        try {
            const obj = JSON.parse(window.atob(base64));
            this.setState({
                APP_ID: obj.app_id || '',
                USER_ID: obj.user_id || '',
                ACCESS_TOKEN: obj.access_token || '',
            });
            return;
        }
        catch (error) {
            console.error('invalid link');
        }

        this.setState({ link });
    };

    onClickPaste = async (e) => {
        const link = await navigator.clipboard.readText();
        if (link) this.updateLink(link);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.appCtx.login({
            APP_ID: this.state.APP_ID,
            USER_ID: this.state.USER_ID,
            ACCESS_TOKEN: this.state.ACCESS_TOKEN,
        })
    };

    render() {
        const elements = {
            APP_ID: (
                <input type='text'
                    id='APP_ID'
                    value={this.state.APP_ID}
                    onChange={this.onChange}
                    required={true}
                />
            ),
            USER_ID: (
                <input type='text'
                    id='USER_ID'
                    value={this.state.USER_ID}
                    onChange={this.onChange}
                    required={true}
                />
            ),
            ACCESS_TOKEN: (
                <input type='text'
                    id='ACCESS_TOKEN'
                    value={this.state.ACCESS_TOKEN}
                    onChange={this.onChange}
                />
            ),
            link: (
                <button type='button' onClick={this.onClickPaste}>paste</button>
            ),
            '=>': (
                <button type='submit'>login</button>
            ),
        };

        return (
            <form id='Login' onSubmit={this.onSubmit} >
                {util.makeTable(elements)}
            </form>
        );
    }
};

export default Login;
