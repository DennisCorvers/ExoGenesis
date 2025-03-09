import { Item } from "../entities/Item";
import { Player } from "../entities/Player";
import { Skill } from "../skills";
import { LayoutRegistry } from "./Registries/LayoutRegistry";
import { NamedObjectRegistry } from "./Registries/NamedObjectRegistry";
import { SkillRegistry } from "./Registries/SkillRegistry";

export interface IGameContext {
    get isPaused(): boolean;
    get player(): Player;
    get skillList(): Skill[];
    get skills(): SkillRegistry;
    get items(): NamedObjectRegistry<Item>;
    get layout(): LayoutRegistry;
}
