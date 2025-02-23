export abstract class Skill {
    private readonly m_id: string;

    constructor(id: string) {
        this.m_id = id
    }

    get id() : string {
        return this.m_id;
    }
    get name() : string {
        return this.m_id;
    }

    abstract update(deltaTime : number) : void;

    abstract canUpdate() : boolean;

    abstract postCompleteAction() : void;

    abstract completeAction() : void;

    abstract isActive() : boolean
}