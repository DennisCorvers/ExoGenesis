import { items } from "../exo/items"
import { skills } from "../exo/skills";
import { sidebar } from "../exo/layout/sidebar"
import { IData } from "../../DataContainer";

export class GameData implements IData {
    public readonly items: any[];
    public readonly skills: any[];
    public readonly sidebar: any[];

    constructor() {
        this.items = items;
        this.skills = skills;
        this.sidebar = sidebar;
    }
}
