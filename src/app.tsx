import * as React from "react"
import { render } from "react-dom"
import { Router, Route } from 'react-router-dom'
import { history } from "@/lib"
import * as app from "@/state"
import * as pages from "@/pages"
export * from "./state"

export const routes = {
    root: '/',
    login: '/login',
    registration: '/registration',
    main: '/main',
}

export default class App extends React.Component<{
}> {
    state = {
    }

    async componentWillMount() {
        app.state.user(this);
        const user = localStorage.getItem('user')
        if(user){
            app.state.set('user', JSON.parse(user));
        }
    }

    render() {

        return (
            <Router history={history}>
                <div>
                    <Route exact path={routes.login} component={pages.Login} />
                    <Route exact path={routes.registration} component={pages.Registration} />
                    <Route exact path={routes.root} component={pages.Main} />
                    <Route exact path={routes.main} component={pages.Main} />

                </div>
            </Router>
        )
    }
}

render(<App />, document.getElementById('app'));
