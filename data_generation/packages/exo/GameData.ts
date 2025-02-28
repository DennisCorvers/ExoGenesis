import { items } from "../exo/items"
import { skills } from "../exo/skills";
import { IData } from "../../DataContainer";

export class GameData implements IData{
    public readonly items: any[];
    public readonly skills: any[];

    constructor() {
        this.items = items;
        this.skills = skills;
    }
}
