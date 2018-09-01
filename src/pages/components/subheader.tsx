import * as React from "react"
import Calendar from 'react-calendar';


export class Subheader extends React.Component<{
    newNote: () => void
    saveNote: () => void
    deleteNote: () => void
    dueDate: (date:Date) => void
    archiveNote: (checked: boolean) => void
    isArchive: boolean
}> {
    state = {
        isArchive: false,
        showCalendar: false,
        dateCalendar: undefined as Date
    }

    componentWillMount() {
    }
    componentWillReceiveProps(nexProps: any) {
        this.setState({ isArchive: nexProps.isArchive })
    }



    render() {

        return (
            <div className={'sub_header'}>
                <div className={'left__nav'}>
                    <select disabled={true}>
                        <option>All</option>
                        <option>Active</option>
                        <option>Archived</option>
                    </select>
                    <label>
                        <input type="text" name="Search" placeholder="Search" disabled={true} />
                    </label>
                </div>
                <div className={'right__nav'}>
                    <div className="note__btn" onClick={async () => {
                        await this.props.newNote()
                    }}>
                        <img src="img/New.svg" title="" />
                        <span>New note</span>
                    </div>
                    <div
                        className="note__btn"
                        onMouseLeave={() => {
                            this.setState({ showCalendar: false })
                        }}
                        onMouseMove={() => {
                            this.setState({ showCalendar: true })
                        }}>
                        <img src="img/I.svg" title="" />
                        <span>Due date</span>

                        {this.state.showCalendar && <div
                            onMouseLeave={() => {
                                this.setState({ showCalendar: false })
                            }}
                            onMouseMove={() => {
                                this.setState({ showCalendar: true })
                            }}
                        >
                            <Calendar
                                value={this.state.dateCalendar}
                                onChange={(date: Date) => {
                                    this.props.dueDate(date)
                                    this.setState({ dateCalendar: date })
                                }} /></div>
                        }
                    </div>
                    <div className="note__btn" onClick={async () => {
                        await this.props.deleteNote()
                    }}>
                        <img src="img/Can.svg" title="" />
                        <span>Delete</span>
                    </div>
                    <div className="note__btn">
                        <label>
                            <input
                                type="checkbox"
                                checked={this.state.isArchive || false}
                                onChange={(e) => {
                                    this.setState({ isArchive: e.target.checked })
                                    this.props.archiveNote(e.target.checked)
                                }}
                            />
                            <span>archived</span>
                        </label>
                    </div>
                    <div className="note__btn" onClick={async () => {
                        await this.props.saveNote()
                    }}>
                        <img src="img/New.svg" title="" />
                        <span>Save note</span>
                    </div>
                </div>
            </div>
        );
    }
}
