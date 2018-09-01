import { Event } from "./event"

export abstract class ComponentUpdater {
    subscribe(component: React.Component): void {
        const orig = component.componentWillUnmount;
        const idx = this.updateEvent.on(component.forceUpdate.bind(component));
        const self = this;
        component.componentWillUnmount = function() {
            self.updateEvent.off(idx);
            if (orig) orig.apply(this, arguments);
        }
    }

    protected update() {
        this.updateEvent.trigger();
    }

    private updateEvent = new Event;
}

export class State<T> extends ComponentUpdater {
    setState(state: Partial<T>) {
        this.assign(state);
        this.update();
    }

    static create<T>(defaultState: T): State<T> & Readonly<T> {
        const rv = new State<T>();
        rv.assign(defaultState);
        return rv as any;
    }

    protected assign(state: Partial<T>) {
        Object.assign(this, state);
    }
}

export interface GetSet<TVal> {
    (): TVal
    (component: React.Component): TVal
    set(val: TVal): void
}

export class PropState<T> {
    static create<T>(defaultState: T): PropState<T> & { [P in keyof T]: GetSet<T[P]> } {
        const rv = new PropState(defaultState) as any;
        for (const n in defaultState) {
            rv[n] = function(component: React.Component) {
                return rv.get(n, component);
            };
            rv[n].set = function(val: any) {
                return rv.set(n, val);
            }
        }
        return rv as any;
    }

    constructor(protected data: T) {
    }

    get<K extends keyof T>(name: K, component?: React.Component): T[K] {
        if (component) this.subscribe(name, component);
        return this.data[name];
    }

    set<K extends keyof T>(name: K, val: T[K]) {
        if (this.data[name] !== val) {
            this.data[name] = val;
            if (this.components[name]) {
                this.components[name].forEach(c => c.forceUpdate());
            }
        }
    }

    setState(newstate: Partial<T>) {
        Object.assign(this, newstate);
        for (const name in newstate) {
            const val = newstate[name];
            if (this.data[name] !== val) {
                if (this.components[name]) {
                    this.components[name].forEach(c => c.forceUpdate());
                }
            }
        }
    }

    protected subscribe<K extends keyof T>(name: K, component: React.Component) {
        let arr = this.components[name];
        if (!arr) arr = this.components[name] = [];
        if (arr.indexOf(component) < 0) {
            const unmount = component.componentWillUnmount;
            arr.push(component);
            component.componentWillUnmount = function() {
                arr.splice(arr.indexOf(this), 1);
                if (unmount) unmount.apply(this, arguments);
            }
        }
    }

    protected components = {} as { [P in keyof T]: React.Component[] }
}
