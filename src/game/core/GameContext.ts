import { IDataProvider } from "@game/data/IDataProvider";
import { ISerializable } from "../data/ISerializable";
import { Item } from "../entities/Item"
import { Player } from "../entities/Player";
import { Skill } from "../skills/Skill";
import { IGameContext } from "./IGameContext";
import { IUpdatable } from "./IUpdatable";
import { NamedObjectRegistry } from "./Registries/NamedObjectRegistry";
import { SkillRegistry } from "./Registries/SkillRegistry";
import { Layout } from "./Layout";
import { TestPlayer } from "../../test/TestPlayer";

export class GameContext implements IGameContext, ISerializable, IUpdatable {
    private m_player: Player;
    private m_isPaused: boolean;

    private readonly m_skillRegistry: SkillRegistry;
    private readonly m_itemRegistry: NamedObjectRegistry<Item>;
    private readonly m_layout: Layout;

    public get isPaused(): boolean {
        return this.m_isPaused;
    }

    public get player(): Player {
        return this.m_player;
    }

    public get skillList(): Skill[] {
        return this.m_skillRegistry.objects;
    }

    public get skills(): SkillRegistry {
        return this.m_skillRegistry;
    }

    public get items(): NamedObjectRegistry<Item> {
        return this.m_itemRegistry;
    }

    public get layout(): Layout {
        return this.m_layout;
    }

    public constructor(dataProvider: IDataProvider) {
        this.m_skillRegistry = dataProvider.skills;
        this.m_itemRegistry = dataProvider.items;
        this.m_layout = new Layout(dataProvider);
        this.m_isPaused = false;


        // This should be one of the last steps, as data needs to be loaded to create a (blank) player.
        this.m_player = new TestPlayer(this);
    }

    public update(deltaTime: number) {
        if (this.m_isPaused) return;

        this.m_player.update(deltaTime);
    }

    public loadData() {
        this.m_player.loadData();
    }
}
