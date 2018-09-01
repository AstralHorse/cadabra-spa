import * as api from './';

const email = 'danil.pichkovskiy@gmail.com';
const password = '12345678';

export async function testApi() {
    console.log(`get user`)
    const user = await api.signIn({ email: email, password: password });
    console.log(user)

    console.log(`get all notes`)
    const notes = await api.note.getAll(user, {search_keywords: 'up'})
    console.log(notes)


    console.log(`create note`)
    const note = await api.note.create(user, {
        title: 'test',
        text: 'test test test',
        archived: false,
        position: 2,
        due_date: new Date().toISOString()
    });
    console.log(note)


    console.log(`update note`)
    const updateNote = await api.note.update(user, {
        id: note.id,
        text: 'test test update',
        title: 'test update'
    })
    console.log(updateNote)


    console.log(`remove note`)
    const rm = await api.note.remove(user, note.id)
    console.log(rm)
}
