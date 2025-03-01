import { IUpdatable } from "../core/IUpdatable";
import { MineralHarvestingState } from "../state";
import { IGameContext } from "../core/IGameContext";
import { Skill } from "../skills/Skill";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";
import { IPlayerContext } from "./IPlayerContext";
import { ISkillState } from "../state/ISkillState";
import { ISkillManager } from "./ISkillManager";

export class SkillManager implements ISkillManager, IUpdatable {
    // The skill the player itself can do (only 1 skill at a time).
    private m_playerSelectedSkill: ISkillState | null;
    // Passive skills
    private m_activeSkills: Map<string, ISkillState>;
    private m_skillStates: Map<string, ISkillState>;

    public get activeSkills(): ISkillState[] {
        return [...this.m_activeSkills.values()];
    }

    public get skillStates(): ISkillState[] {
        return [...this.m_skillStates.values()];
    }

    public get playerSelectedSkill(): ISkillState | null {
        return this.m_playerSelectedSkill;
    }

    public get isPlayerBusy(): boolean {
        return this.m_playerSelectedSkill != null && this.m_playerSelectedSkill.isActive;
    }

    constructor(gameContext: IGameContext, playerContext: IPlayerContext) {
        this.m_playerSelectedSkill = null;
        this.m_activeSkills = new Map<string, ISkillState>();
        this.m_skillStates = new Map<string, ISkillState>();

        const skillStateMapping = new Map<Skill, new (skill: Skill, playerContext: IPlayerContext) => ISkillState>([
            [gameContext.skills.mineralHarvesting, MineralHarvestingState],
        ]);


        for (const [skill, StateClass] of skillStateMapping) {
            this.m_skillStates.set(skill.id, new StateClass(skill, playerContext));
        }
    }

    public update(deltaTime: number): void {
        if (this.isPlayerBusy) {
            this.m_playerSelectedSkill!.update(deltaTime);
        }

        if (this.m_activeSkills.size > 0) {
            for (const state of this.m_activeSkills.values()) {
                state.update(deltaTime);
            }
        }
    }

    public getSkillState(skill: Skill): ISkillState {
        const state = this.m_skillStates.get(skill.id);
        if (state == null) {
            throw new Error(`Skill with id ${skill.id} does not exist.`);
        }

        return state;
    }

    public startPlayerAction(skill: Skill, action: BaseRecipe, toggle: boolean = false) {
        // Nothing busy, just start a new action.
        if (!this.isPlayerBusy) {
            this.m_playerSelectedSkill = this.getSkillState(skill);
            this.m_playerSelectedSkill.startAction(action);

            return;
        }

        if (this.m_playerSelectedSkill!.skill === skill) {
            // Same skill, action is already running.
            if (!this.m_playerSelectedSkill!.isRunningAction(action)) {
                this.m_playerSelectedSkill!.startAction(action);
            }
            else if (toggle) {
                this.m_playerSelectedSkill!.stopAction(action);
            }

            return;
        }

        this.m_playerSelectedSkill!.stopAllActions();
        this.m_playerSelectedSkill = this.getSkillState(skill);
        this.m_playerSelectedSkill.startAction(action);
    }

    public stopPlayerAction(skill: Skill, action: BaseRecipe) {
        // If no skill is active, do nothing.
        if (!this.isPlayerBusy) {
            return;
        }

        // If the same skill is active, stop the target action.
        if (this.m_playerSelectedSkill!.skill === skill) {
            this.m_playerSelectedSkill!.stopAction(action);
        }
    }
}