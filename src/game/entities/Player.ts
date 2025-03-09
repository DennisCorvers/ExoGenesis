import { IUpdatable } from "../core/IUpdatable";
import { SkillManager } from "../systems/SkillManager";
import { ISerializable } from "../data/ISerializable";
import { IGameContext } from "../core/IGameContext";
import { IPlayerContext } from "../systems/IPlayerContext";
import { ISkillManager } from "../systems/ISkillManager";
import { IStorageManager } from "@game/systems/storage/IStorageManager";
import { Inventory } from "@game/systems/storage/Inventory";
import { Storage } from "@game/systems/storage/Storage";
import { ILayoutConfig, LayoutConfig } from "@game/ui/LayoutConfig";

export class Player implements IPlayerContext, ISerializable, IUpdatable {
    protected gameContext: IGameContext;
    private m_name: string;
    private m_storage: IStorageManager;
    private m_skillManager: SkillManager;
    private m_layoutPreferences: ILayoutConfig;

    public get name(): string {
        return this.m_name;
    }

    public get skillManager(): ISkillManager {
        return this.m_skillManager;
    }

    public get storage(): IStorageManager {
        return this.m_storage;
    }

    public get layoutConfig(): ILayoutConfig {
        return this.m_layoutPreferences;
    }

    constructor(game: IGameContext) {
        this.m_name = "Test Player";
        this.m_storage = new Storage();
        this.m_skillManager = new SkillManager(game, this);
        this.gameContext = game;
        this.m_layoutPreferences = new LayoutConfig();
    }

    public update(deltaTime: number) {
        this.m_skillManager.update(deltaTime);
    }

    public loadData() {

    }
}