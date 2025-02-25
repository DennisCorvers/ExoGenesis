import { IUpdatable } from "../core/IUpdatable";
import { ISkillState } from "../state/SkillState";
import { MineralHarvestingState } from "../state";
import { IGameContext } from "../core/IGameContext";
import { Skill } from "../skills/Skill";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";

export class SkillManager implements IUpdatable {
    // The skill the player itself can do (only 1 skill at a time).
    private m_playerActiveSkill: ISkillState | null;
    // Passive skills
    private m_activeSkills: Map<string, ISkillState>;
    private m_skills: Map<string, ISkillState>;

    public get activeSkills(): ISkillState[] {
        return [...this.m_activeSkills.values()];
    }

    public get skillStates(): ISkillState[] {
        return [...this.m_skills.values()];
    }

    public get isPlayerBusy(): boolean {
        return this.m_playerActiveSkill != null;
    }

    constructor(gameContext: IGameContext) {
        this.m_playerActiveSkill = null;
        this.m_activeSkills = new Map<string, ISkillState>();
        this.m_skills = new Map<string, ISkillState>();

        const skillStateMapping = new Map<Skill, new (skill: Skill) => ISkillState>([
            [gameContext.skills.mineralHarvesting, MineralHarvestingState],
        ]);


        for (const [skill, StateClass] of skillStateMapping) {
            this.m_skills.set(skill.id, new StateClass(skill));
        }
    }

    public update(deltaTime: number): void {
        if (this.m_playerActiveSkill != null) {
            this.m_playerActiveSkill.update(deltaTime);
        }

        if (this.m_activeSkills.size > 0) {
            for (const state of this.m_activeSkills.values()) {
                state.update(deltaTime);
            }
        }
    }

    public getSkillState(id: string): ISkillState {
        const state = this.m_skills.get(id);
        if (state == null) {
            throw new Error(`Skill with id ${id} does not exist.`);
        }

        return state;
    }

    public startPlayerAction(skill: Skill, action: BaseRecipe, toggle: boolean = false) {
        // Nothing busy, just start a new action.
        if (this.m_playerActiveSkill == null) {
            this.m_playerActiveSkill = this.getSkillState(skill.id);
            this.m_playerActiveSkill.startAction(action);

            return;
        }

        if (this.m_playerActiveSkill.skill === skill) {
            // Same skill, action is already running.
            if (!this.m_playerActiveSkill.isRunningAction(action)) {
                this.m_playerActiveSkill.startAction(action);
            }
            else if (toggle) {
                this.m_playerActiveSkill.stopAction(action);
            }

            return;
        }

        this.m_playerActiveSkill.stopAllActions();
        this.m_playerActiveSkill = this.getSkillState(skill.id);
        this.m_playerActiveSkill.startAction(action);
    }

    public stopPlayerAction(skill: Skill, action: BaseRecipe) {
        // If no skill is active, do nothing.
        if (this.m_playerActiveSkill == null) {
            return;
        }

        // If the same skill is active, stop the target action.
        if (this.m_playerActiveSkill.skill === skill) {
            this.m_playerActiveSkill.stopAction(action);

            // If stopping the action above made the skill inactive,
            // remove it from the active skill property.
            if (!this.m_playerActiveSkill.isActive) {
                this.m_playerActiveSkill = null;
            }
        }
    }
}