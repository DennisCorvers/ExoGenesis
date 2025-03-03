
import { NamedObjectRegistry } from "@game/core/Registries/NamedObjectRegistry";
import { SkillRegistry } from "@game/core/Registries/SkillRegistry";
import { Item } from "@game/entities/Item";
import { SidebarLayout } from "@game/ui/SidebarLayout";

export interface IDataProvider {
    readonly items: NamedObjectRegistry<Item>;
    readonly skills: SkillRegistry;
    readonly sidebar: SidebarLayout;
}