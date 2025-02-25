import { IUpdatable } from "../core/IUpdatable";
import { IStorageManager, StorageManager } from "../systems/StorageManager";
import { SkillManager } from "../systems/SkillManager";
import { ISerializable } from "../data/ISerializable";
import { IGameContext } from "../core/IGameContext";
import { IPlayerContext } from "../systems/IPlayerContext";
import { ISkillManager } from "../systems/ISkillManager";

export class Player implements IPlayerContext, ISerializable, IUpdatable {
    private m_name: string;
    private m_inventory: StorageManager;
    private m_skillManager: SkillManager;

    public get name(): string {
        return this.m_name;
    }

    public get inventory(): IStorageManager {
        return this.m_inventory;
    }

    public get skillManager(): ISkillManager {
        return this.m_skillManager;
    }

    public get storage(): IStorageManager {
        throw new Error("Player has no storage.");
    }

    constructor(game: IGameContext) {
        this.m_name = "Test Player";
        this.m_inventory = new StorageManager(game);
        this.m_skillManager = new SkillManager(game, this);
    }

    public update(deltaTime: number) {
        this.m_skillManager.update(deltaTime);
    }
}