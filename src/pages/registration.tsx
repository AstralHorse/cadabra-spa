import * as React from "react"
import * as api from "../api"
import { history } from '../lib'
import * as app from "../app"

import * as components from "./components";

export class Registration extends React.Component<{
}> {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: ''
    }

    componentWillMount() {
    }

    handleOnChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        if (app.state.user() && app.state.user().id) {
            history.push(app.routes.main)
            return <div />;
        } else
            return (
                <div>
                    <components.Header title={'Sign Up'} />
                    <div className={'poup_sign'}>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.name} />
                            <input
                                type="text"
                                name="email"
                                placeholder="E-Mail"
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.email} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.password} />
                            <input
                                type="password"
                                name="confirm"
                                placeholder="Comfirm"
                                onChange={this.handleOnChange.bind(this)}
                                value={this.state.confirm} />
                        </form>
                        <div className={'add'}>
                            <button className={'base-label-pointing'} onClick={() => history.push(app.routes.login)}>Sign In</button>
                            <button className={'base-label-pointing active'}
                                onClick={async () => {
                                    const user = await api.auth({
                                        name: this.state.name,
                                        email: this.state.email,
                                        password: this.state.password,
                                        password_confirmation: this.state.confirm
                                    });
                                    if(user.id){
                                        app.state.set('user', user);
                                        history.push(app.routes.main);
                                    }
                                }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            );
    }
}
