namespace Events {
    const store: Record<string, Function[]> = {};
    let setListener: Function;

    export function attach(event: string, callback: Function) {
        if (!store[event]) {
            store[event] = [];
        }
        store[event].push(callback);
    }

    export function fire(event: string, args: unknown[] = []) {
        if (store[event]) {
            store[event].forEach(callback => {
                callback(...args);
            });
        }
    }

    export function remove(event: string, callback?: Function) {
        if (!callback) {
            delete store[event];
        }
        if (store[event]) {
            store[event] = store[event].filter(savedCallback => {
                return callback !== savedCallback;
            });
        }
    }

    export function dom(element: any, event: string, callback: Function) {
        if (!setListener) {
            if (element.addEventListener) {
                setListener = (el: any, ev: any, fn: any) => {
                    return el.addEventListener(ev, fn, false);
                };
            } else if (typeof element.attachEvent === 'function') {
                setListener = (el: any, ev: any, fn: any) => {
                    return el.attachEvent(`on${ev}`, fn, false);
                };
            } else {
                setListener = (el: any, ev: any, fn: any) => {
                    // eslint-disable-next-line no-return-assign, no-param-reassign
                    return el[`on${ev}`] = fn;
                };
            }
        }
        return setListener(element, event, callback);
    }
}

export class AppVisibility {
    public static STATUS_ACTIVE: string = 'active';
    public static STATUS_HIDDEN: string = 'hidden'

    private DOC_HIDDEN: string | undefined;
    private VISIBILITY_CHANGE_EVENT: string | undefined;
    private m_status: string = AppVisibility.STATUS_ACTIVE;
    private static m_instance: AppVisibility | null = null;

    public static get instance(): AppVisibility {
        if (this.m_instance === null) {
            this.m_instance = new AppVisibility(document);
        }
        return this.m_instance;
    }

    private constructor(doc: any) {
        this.DOC_HIDDEN = undefined;
        this.VISIBILITY_CHANGE_EVENT = undefined;

        if (doc.hidden !== undefined) {
            this.DOC_HIDDEN = 'hidden';
            this.VISIBILITY_CHANGE_EVENT = 'visibilitychange';
        } else if (doc.mozHidden !== undefined) {
            this.DOC_HIDDEN = 'mozHidden';
            this.VISIBILITY_CHANGE_EVENT = 'mozvisibilitychange';
        } else if (doc.msHidden !== undefined) {
            this.DOC_HIDDEN = 'msHidden';
            this.VISIBILITY_CHANGE_EVENT = 'msvisibilitychange';
        } else if (doc.webkitHidden !== undefined) {
            this.DOC_HIDDEN = 'webkitHidden';
            this.VISIBILITY_CHANGE_EVENT = 'webkitvisibilitychange';
        }

        if (!this.DOC_HIDDEN) {
            throw Error('No hidden event found.')
        }

        const trackChange = () => {
            if (doc[this.DOC_HIDDEN!]) {
                this.blur();
            } else {
                this.focus();
            }
        };

        trackChange();
        Events.dom(doc, this.VISIBILITY_CHANGE_EVENT!, trackChange);
    }

    public subscribe(event: string, callback: (data: any) => any): AppVisibility {
        Events.attach(event, callback);
        return this;
    }

    public unsubscribe(event: string, callback?: any): AppVisibility {
        Events.remove(event, callback);
        return this;
    }

    private blur(callback?: (data: any) => any): AppVisibility {
        if (callback) {
            this.subscribe(AppVisibility.STATUS_HIDDEN, callback);
        } else {
            this.m_status = AppVisibility.STATUS_HIDDEN;
            Events.fire('hidden');
            Events.fire('statusChanged', [{ status: this.m_status }]);
        }
        return this;
    }

    private focus(callback?: (data: any) => any): AppVisibility {
        if (callback) {
            this.subscribe(AppVisibility.STATUS_ACTIVE, callback);
        } else if (this.m_status !== AppVisibility.STATUS_ACTIVE) {
            this.m_status = AppVisibility.STATUS_ACTIVE;
            Events.fire(AppVisibility.STATUS_ACTIVE);
            Events.fire('statusChanged', [{ status: this.m_status }]);
        }
        return this;
    }
}

const IsVisible = AppVisibility.instance;
export default IsVisible;