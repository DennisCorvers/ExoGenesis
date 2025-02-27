import { items } from "../exo/items"
import { skills, skillRecipes } from "../exo/skills";

export class GameData {
    public readonly items: any[];
    public readonly skills: any[];
    public readonly skillRecipes: any[];

    constructor() {
        this.items = items;
        this.skills = skills;
        this.skillRecipes = skillRecipes;
    }

    public serialize(): string {
        const serializedData = JSON.stringify(this);
        return serializedData;
    }
}
