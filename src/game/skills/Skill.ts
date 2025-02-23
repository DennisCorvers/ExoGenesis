import { NamedObject } from "../core/NamedObject";

export abstract class Skill extends NamedObject {
    constructor(name: string) {
        super(name);
    }

    abstract update(deltaTime: number): void;

    abstract canUpdate(): boolean;

    abstract postCompleteAction(): void;

    abstract completeAction(): void;

    abstract isActive(): boolean
}