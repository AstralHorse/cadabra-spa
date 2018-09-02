import * as components from "./components";
import * as React from "react"
import * as app from "../app";
import { history } from '../lib'
import * as api from "../api"
import * as moment from "moment";
import "moment/locale/uk";

const DragSortableList = require('react-drag-sortable').default;

moment.locale('uk');

export class Main extends React.Component<{
}> {
    state = {
        myClassActive: '',
        note: {
            title: '',
            text: ''
        } as api.In.Note,
        notes: [] as api.In.Note[]
    }

    async componentWillMount() {
        if (app.state.user()) {
            const notes = await api.note.getAll(app.state.user())
            console.log(notes)
            this.setState({ notes: notes })
        }
    }
    onSort = function(sortedList: any) {
    	console.log("sortedList", sortedList);
    }

    render() {
        const list = [] as any;
        if (!app.state.user()) {
            history.push(app.routes.login)
            return <div />;
        } else
            return (
                <section>
                    <components.Header title={'Notes'} />
                    <components.Subheader
                        dueDate={async (date: Date) => {
                            const note = { ...this.state.note, due_date: moment(date).toLocaleString() }
                            this.setState({ note: note })
                            if (this.state.note.id) {
                                await api.note.update(app.state.user(), note)
                                this.setState({ notes: await api.note.getAll(app.state.user()) })
                            }
                        }}
                        deleteNote={async () => {
                            if (this.state.note.id) {
                                const id = await api.note.remove(app.state.user(), this.state.note.id)
                                if (id === this.state.note.id) {
                                    this.setState({ note: { title: '', text: '' } })
                                }
                            }
                            this.setState({ notes: await api.note.getAll(app.state.user()) })
                        }}
                        newNote={() => {
                            this.setState({ note: { title: '', text: '', id: undefined } })
                        }}
                        saveNote={async () => {
                            if (this.state.note.id) {
                                await api.note.update(app.state.user(), this.state.note)
                            } else {
                                if (!this.state.note.title) return;
                                await api.note.create(app.state.user(), this.state.note)
                            }
                            this.setState({ notes: await api.note.getAll(app.state.user()) })
                        }}
                        archiveNote={(isArchive: boolean) => {
                            this.setState({ note: { ...this.state.note, archived: isArchive } })
                        }}
                        isArchive={this.state.note.archived}
                    />
                    <div className={'main'}>
                        <div className={`left_note`}>

                            {
                                this.state.notes.length ?
                                    (this.state.notes.map((note, i) => {

                                            list.push({content: <div className={`nav_note
                                            ${note.archived ? 'archived' : ''}
                                            ${note.id === this.state.note.id ? 'active' : ''}`}
                                                key={i} onClick={() => {
                                                    this.setState({
                                                        note: note
                                                    })
                                                }}>
                                                <div className={'note_title'}>
                                                    {note.title}
                                                </div>
                                                <div className={'note__description'}>
                                                    {note.text}
                                                </div>
                                                <span className={'date'}>
                                                    {note.due_date ? moment(note.due_date).format('L') : ''}
                                                </span>
                                            </div>})

                                    }) && <DragSortableList items={list} moveTransitionDuration={0.3} onSort={this.onSort} type="vertical"/>)
                                    : <div className={'nav_note'} onClick={() => {
                                        this.setState({
                                            note: {
                                                title: "My first Note",
                                                text: "Note description"
                                            }
                                        })
                                    }}>
                                        {/* <ReactLoading type={'spinningBubbles'} color={'#000'} height={'20%'} width={'20%'} /> */}
                                        <div className={'note_title'}>
                                            {'My first Note'}
                                        </div>
                                        <div className={'note__description'}>
                                            {"Note description"}
                                        </div>
                                        <span className={'date'}>
                                            {/* <Moment format="DD.MM.YYYY">{new Date().toString()}</Moment> */}
                                        </span>
                                    </div>
                            }
                        </div>
                        <div className={'rignt_note'}>
                            <div className={'note_title'}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.note.title}
                                    onChange={(e) => {
                                        this.setState({ note: { ...this.state.note, title: e.target.value } })
                                    }}
                                />
                            </div>
                            <div className={'note__description'}>
                                <textarea
                                    placeholder="Detail"
                                    value={this.state.note.text}
                                    onChange={(e) => {
                                        this.setState({ note: { ...this.state.note, text: e.target.value } })
                                    }}
                                />

                            </div>
                        </div>
                    </div>
                </section >


            );
    }
}

// setInterval(()=>{
//     this.setState({count: --this.state.count})
//     if(this.state.count < 0 ){
//         alert('екпить')
//     }
//
// }, 1000)
