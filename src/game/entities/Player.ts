import { IUpdatable } from "../core/IUpdatable";
import { StorageManager } from "../systems/StorageManager";
import { SkillManager } from "../systems/SkillManager";
import { ISerializable } from "../data/ISerializable";
import { ISkillState } from "../state/SkillState";
import { IGameContext } from "../core/IGameContext";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";
import { Skill } from "../skills";

export class Player implements ISerializable, IUpdatable {
    private m_name: string;
    private m_inventory: StorageManager;
    private m_skillManager: SkillManager;

    public get name(): string {
        return this.m_name;
    }

    public get inventory(): StorageManager {
        return this.m_inventory;
    }

    public get skills(): SkillManager {
        return this.m_skillManager;
    }

    constructor(game: IGameContext) {
        this.m_name = "Test Player";
        this.m_inventory = new StorageManager(game);
        this.m_skillManager = new SkillManager(game);
    }

    public getSkillState<T extends ISkillState>(skillID: string): T {
        return this.m_skillManager.getSkillState(skillID) as T;
    }

    public update(deltaTime: number) {
        this.m_skillManager.update(deltaTime);
    }

    public startSkillAction(skill: Skill, recipe: BaseRecipe): void {
        // TODO: Check if the player can start this action.

        if (recipe.playerCanStart(this)) {
            this.m_skillManager.startPlayerAction(skill, recipe);
        }
    }

    public stopSkillAction(skill: Skill, recipe: BaseRecipe): void {
        this.m_skillManager.stopPlayerAction(skill, recipe);
    }
}