export class NamedObject {
    private static lastID: number;
    private m_namespace: string;
    private m_localID: string;
    private m_uid: number;
    private m_id: string;

    static {
        NamedObject.lastID = 0;
    }

    constructor(namespace: string, localID: string) {
        this.m_namespace = namespace;
        this.m_localID = localID;
        this.m_id = `${this.m_namespace}.${this.m_localID}`
        this.m_uid = NamedObject.lastID++;
    }

    get namespace(): string {
        return this.m_namespace;
    }

    get id(): string {
        return this.m_id;
    }

    get name(): string {
        return this.m_localID;
    }

    get uid(): number {
        return this.m_uid;
    }
}