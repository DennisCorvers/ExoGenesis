import { NamedObject } from "../core/NamedObject";
import { BaseRecipe } from "./requirements/BaseRecipe";

export abstract class Skill extends NamedObject {
    //private m_unlockRequirements;
    //private m_levelRewards;
    //private pets??
    //private availablePlanets

    private m_levelCap: number = null!;
    private m_media: string = null!;

    public get LevelCap(): number {
        return this.m_levelCap;
    }

    public get Media(): string {
        return this.m_media;
    }

    constructor(namespace: string, name: string) {
        super(namespace, name);
    }

    abstract isValidRecipe(recipe: BaseRecipe): boolean;
}