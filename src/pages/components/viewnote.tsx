import * as React from "react"

export class Viewnote extends React.Component<{
}> {
    state = {

    }

    componentWillMount() {
    }
    handleOnChange(e: any) {
        // console.log(e.target.name)
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {

        return (
            <div/>
        );
    }
}
