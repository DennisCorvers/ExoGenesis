import { Item } from "../entities/Item";
import { Player } from "../entities/Player";
import { Skill } from "../skills";
import { ObjectRegistry } from "./ObjectRegistry";
import { SkillRegistry } from "./SkillRegistry";

export interface IGameContext {
    get isPaused(): boolean;
    get player(): Player;
    get skillList(): Skill[];
    get skills(): SkillRegistry;
    get itemRegistry(): ObjectRegistry<Item>;
}
