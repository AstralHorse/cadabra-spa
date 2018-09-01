import * as React from "react"

export class Listnote extends React.Component<{
    title: string
    description: string
    date: string

}> {
    state = {
        myClassActive: false,
    }

    componentWillMount() {
    }

    render() {

        return (
    <div></div>
        );
    }
}
