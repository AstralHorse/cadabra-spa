export namespace Out {
    export interface Base {
        email: string,
        password: string
    }

    export interface SignIn extends Base {
    }

    export interface Auth extends Base {
        name: string
        password_confirmation: string
    }
    export interface Note extends NoteBase {
    }
    export interface SearchParams {
        search_keywords: string
        filter: 'active' | 'archived'
        page: number
        per_page: number
    }
}

export namespace In {
    export interface User extends Headers {
        id: string
        name: string
        email: string,
        created_at: string
        updated_at: string
    }

    export interface Headers {
        'access-token': string
        'client': string
        'expiry': string
        'uid': string
    }
    export interface Note extends NoteBase {
        id: string
        created_at: string
        updated_at: string
    }
}

interface NoteBase {
    title: string
    text: string
    archived: boolean
    due_date: string
    position?: number
}
