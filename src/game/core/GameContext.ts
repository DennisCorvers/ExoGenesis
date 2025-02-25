import { ISerializable } from "../data/ISerializable";
import { Item } from "../entities/Item"
import { Player } from "../entities/Player";
import { Skill } from "../skills/Skill";
import { IGameContext } from "./IGameContext";
import { IUpdatable } from "./IUpdatable";
import { ObjectRegistry } from "./ObjectRegistry";
import { SkillRegistry } from "./SkillRegistry";

export class GameContext implements IGameContext, ISerializable, IUpdatable {
    private static m_instance: GameContext;

    private m_player: Player;
    private m_isPaused: boolean;

    private readonly m_skillRegistry: SkillRegistry;
    private readonly m_itemRegistry: ObjectRegistry<Item>;

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

    public get items(): Item[] {
        return this.m_itemRegistry.objects;
    }

    public get itemRegistry(): ObjectRegistry<Item> {
        return this.m_itemRegistry;
    }

    public constructor() {
        this.m_skillRegistry = new SkillRegistry();
        this.m_itemRegistry = new ObjectRegistry<Item>();
        this.m_isPaused = false;


        // This should be one of the last steps, as data needs to be loaded to create a (blank) player.
        this.m_player = new Player(this);
    }

    public update(deltaTime: number) {
        if (this.m_isPaused) return;

        this.m_player.update(deltaTime);
    }
}
