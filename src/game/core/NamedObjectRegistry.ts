import { NamedObject } from "./NamedObject";

export class NamedObjectRegistry<T extends NamedObject> {
    private m_registry: Map<string, T>;

    public get objects(): T[] {
        return [...this.m_registry.values()];
    }

    public get count() {
        return this.m_registry.size;
    }

    constructor() {
        this.m_registry = new Map<string, T>();
    }

    public getObject(id: string): T {
        const obj = this.m_registry.get(id);
        if (obj === null)
            throw new Error(`Object with id ${id} does not exist.`)

        return <T>obj;
    }

    public getObjectByType(type: { new(): T }): T {
        for (const obj of this.m_registry.values()) {
            if (obj instanceof type) {
                return obj;
            }
        }
        throw new Error(`Object of type ${type.name} not found.`);
    }

    public registerObject(object: T): T {
        if (this.m_registry.has(object.id))
            throw new Error(`Attempting to register object with duplicate id: ${object.id}.`);

        this.m_registry.set(object.id, object);
        return object;
    }
}