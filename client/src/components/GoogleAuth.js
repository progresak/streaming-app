import React from 'react';

class GoogleAuth extends React.Component {

    state = {isSignedIn: null};

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '370973821898-7d04ju265tjfguagef2abh4fdi73v2jl.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        })
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return (
                <div>
                    Loading...
                </div>
            );
        }else if (this.state.isSignedIn) {
            return (
                <div>Signed in
                    <button className={'ui red google button'} onClick={this.onSignOut}>
                        <i className={'google icon'} /> Log out of Google
                    </button>
                </div>
            );
        }else {
            return (
                <div>
                    <button className={'ui blue google button'} onClick={this.onSignIn}>
                        <i className={'google icon'} /> Sign In with Google
                    </button>
                </div>
            );
        }
    }

    render () {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

export default GoogleAuth;