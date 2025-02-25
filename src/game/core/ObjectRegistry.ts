import { NamedObject } from "./NamedObject";

export class ObjectRegistry<T extends NamedObject> {
    private m_registry: Map<string, T>;

    public get objects(): T[] {
        return [...this.m_registry.values()];
    }

    constructor() {
        this.m_registry = new Map<string, T>();
    }

    public getObject(id: string): T | null {
        return this.m_registry.get(id) ?? null;
    }

    public getObjectByType(type: { new(): T }): T {
        for (const obj of this.m_registry.values()) {
            if (obj instanceof type) {
                return obj;
            }
        }
        throw new Error(`Object of type ${type.name} not found.`);
    }

    public registerObject(object: T) {
        if (this.m_registry.has(object.id))
            throw new Error("Duplicate item ID registered.");

        return this.m_registry.set(object.id, object);
    }
}