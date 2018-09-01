import * as React from "react"
import * as api from "../api"
import { history } from '../lib'
import { Header } from './components';
import * as app from "../app"

// const email = 'danil.pichkovskiy@gmail.com';
// const password = '12345678';

export class Login extends React.Component<{
}> {
    state = {
        email: '',
        password: ''
    }
    componentWillMount() {
        // this.setState({
        //     email: email,
        //     password: password
        // })
    }

    handleOnChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if(app.state.user()){
            history.push(app.routes.main)
            return <div/>;
        } else
        return (
            <div>
                <Header title={'Sign In'} />
                <div className={'poup_sign'}>
                    <form>
                        <input
                            type="text"
                            name="email"
                            placeholder="Login"
                            onChange={this.handleOnChange.bind(this)}
                            value={this.state.email}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleOnChange.bind(this)}
                            value={this.state.password}
                        />
                    </form>
                    <div className={'add'}>
                        <button className={'base-label-pointing active'}
                            onClick={async () => {
                                const user = await api.signIn({ email: this.state.email, password: this.state.password });
                                localStorage.setItem('user', JSON.stringify(user));
                                app.state.set('user', user);
                                history.push(app.routes.main);
                            }}>
                            Sign In
                        </button>
                        <button className={'base-label-pointing'} onClick={() => history.push(app.routes.registration)}>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
}
