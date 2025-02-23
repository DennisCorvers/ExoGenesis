import { IUpdatable } from "../core/IUpdatable";
import { StorageManager } from "../systems/StorageManager";
import { SkillManager } from "../systems/SkillManager";

export class Player implements IUpdatable {
    private m_name: String;
    private m_inventory: StorageManager;
    private m_skillManager: SkillManager;

    constructor() {
        this.m_name = "Test Player";
        this.m_inventory = new StorageManager();
        this.m_skillManager = new SkillManager();
    }
    
    start(): void {
        throw new Error("Method not implemented.");
    }

    public update(deltaTime: number) {

    }
}