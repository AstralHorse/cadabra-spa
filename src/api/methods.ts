import { In, Out } from "./types"
import { Response } from "node-fetch"
import * as queryString from "query-string"

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
}

function createFormBody(obj: Object) {
    var formBody = [];
    for (var property in obj) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(obj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}

async function parseUser(rv: Response) {
    const rvData = await rv.json()

    const user: In.User = {
        id: rvData.id,
        name: rvData.name,
        email: rvData.email,
        updated_at: rvData.updated_at,
        created_at: rvData.created_at,
        'access-token': rv.headers.get('access-token'),
        client: rv.headers.get('client'),
        expiry: rv.headers.get('expiry'),
        uid: rv.headers.get('uid')
    }
    return user;
}

function createHeaderUser(user: In.User) {
    const h: In.Headers = {
        "access-token": user["access-token"],
        client: user.client,
        expiry: user.expiry,
        uid: user.uid
    }
    return h;
}

export async function signIn(param: Out.SignIn) {
    const formBody = createFormBody(param);
    let rv = await fetch('https://cadabra-note-app.herokuapp.com/api/v1/auth/sign_in', {
        method: 'POST',
        headers: headers,
        body: formBody,

    });
    return await parseUser(rv as any);
}

export async function auth(param: Out.Auth) {
    const formBody = createFormBody(param);
    let rv = await fetch('https://cadabra-note-app.herokuapp.com/api/v1/auth', {
        method: 'POST',
        headers: headers,
        body: formBody,

    });
    return await parseUser(rv as any);
}

export namespace note {
    export async function getAll(user: In.User, params?: Partial<Out.SearchParams>) {
        const qs = queryString.stringify(params)
        let rv = await fetch(`https://cadabra-note-app.herokuapp.com/api/v1/notes?${qs}`, {
            method: 'GET',
            headers: {
                ...headers,
                ...createHeaderUser(user)
            },
        });
        return await rv.json() as In.Note[];
    }


    export async function getById(user: In.User, id: string) {
        let rv = await fetch(`https://cadabra-note-app.herokuapp.com/api/v1/notes/${id}`, {
            method: 'GET',
            headers: {
                ...headers,
                ...createHeaderUser(user)
            },
        });
        return await rv.json() as In.Note
    }


    export async function remove(user: In.User, id: string) {
        await fetch(`https://cadabra-note-app.herokuapp.com/api/v1/notes/${id}`, {
            method: 'DELETE',
            headers: {
                ...headers,
                ...createHeaderUser(user)
            }
        });
        return id
    }


    export async function create(user: In.User, note: Out.Note) {
        const data = {
            ...user,
            ...note
        }
        const formBody = createFormBody(data)
        let rv = await fetch('https://cadabra-note-app.herokuapp.com/api/v1/notes', {
            method: 'POST',
            headers: headers,
            body: formBody,

        });
        return await rv.json() as In.Note
    }


    export async function update(user: In.User, note: Partial<Out.Note> & { id: string }) {
        console.log(note)
        const formBody = createFormBody(note)
        await fetch(`https://cadabra-note-app.herokuapp.com/api/v1/notes/${note.id}`, {
            method: 'PATCH',
            headers: {
                ...headers,
                ...createHeaderUser(user)
            },
            body: formBody,

        });
        return await getById(user, note.id)
    }
}
