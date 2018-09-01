export class Event<T = any> {
    private handlers = new Map<number, Event.HandlerStore<T>>();
    private counter = 0;

    on(handler: Event.Handler<T>): number {
        this.handlers.set(this.counter, { handler: handler });
        return this.counter++;
    }
    once(handler: Event.Handler<T>): number {
        this.handlers.set(this.counter, { handler: handler, once: true });
        return this.counter++;
    }
    off(handlerOrIndex: Event.Handler<T> | number): void {
        if (handlerOrIndex instanceof Function) {
            this.handlers.forEach((handler, key) => {
                if (handler.handler === handlerOrIndex) {
                    this.handlers.delete(key);
                }
            });
        } else {
            this.handlers.delete(handlerOrIndex);
        }
    }
    trigger(arg?: T): void {
        if (this.scheduled) this.scheduled = false;
        this.handlers.forEach((handler, key) => {
            handler.handler(arg);
            if (handler.once) {
                this.handlers.delete(key);
            }
        });
    }
    scheduleTrigger(arg?: T): void {
        if (this.scheduled) return;
        this.scheduled = true;
        setTimeout(() => this.trigger(arg), 0);
    }
    private scheduled: boolean;
}

export namespace Event {
    export type Handler<T> = (arg?: T) => void;
    export interface HandlerStore<T> {
        handler: Handler<T>
        once?: boolean
    }
}
