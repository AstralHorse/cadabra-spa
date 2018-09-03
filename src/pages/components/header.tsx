import * as React from "react"
import * as app from "../../app";
import { history } from '../../lib'


export class Header extends React.Component<{
    title: string
}> {
    state = {
        note__description: '',
        title: '',
        date: '',
    }

    componentWillMount() {

    }

    render() {
        if (!app.state.user() || !app.state.user().id) {
            return (
                <div className={'header'}>
                    <h1>{this.props.title}</h1>
                </div>
            )
        } else {
            return (
                <div className={'header'}>
                    <h1>{this.props.title}</h1>
                    <div className={'user'}>
                        <span>
                            {app.state.user().name}
                        </span>
                        <div className={'log_out'} onClick={() => {
                            localStorage.removeItem('user');
                            app.state.set('user', undefined)
                            history.push(app.routes.login);
                        }}>LogOut</div>
                    </div>
                </div>
            )
        }
    }
}
