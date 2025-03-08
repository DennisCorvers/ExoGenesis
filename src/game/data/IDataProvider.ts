
import { NamedObjectRegistry } from "@game/core/Registries/NamedObjectRegistry";
import { SkillRegistry } from "@game/core/Registries/SkillRegistry";
import { Item } from "@game/entities/Item";
import { LayoutRegistry } from "@game/core/Registries/LayoutRegistry";

export interface IDataProvider {
    readonly items: NamedObjectRegistry<Item>;
    readonly skills: SkillRegistry;
    readonly layout: LayoutRegistry;
}