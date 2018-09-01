import * as React from "react"

export class Loading extends React.Component<{
    loading: boolean
}> {
    state = {
        loading: false
    }

    componentWillMount() {
        this.setState({ loading: this.props.loading })
    }

    render() {
        if (this.state.loading) {
            return (
                <div className={'loading'}>
                    Loading
                </div>
            );
        } else return <div />

    }
}
