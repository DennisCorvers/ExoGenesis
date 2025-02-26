import { Skill } from "../skills/Skill";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";
import { IPlayerContext } from "../systems/IPlayerContext";
import { IActionStartResult } from "./ActionStartResult";
import { ActionStoppedReason } from "./ActionStartReason";
import { ISkillState } from "./ISkillState";

export abstract class SkillState<T extends BaseRecipe> implements ISkillState {
    private m_playerContext: IPlayerContext;
    private m_skill: Skill;
    private m_level: number;
    protected m_experience: number;
    protected m_activeAction: T | null;
    protected m_progress: number;

    public get skill(): Skill {
        return this.m_skill;
    }

    public get level(): number {
        return this.m_level;
    }

    public get experience(): number {
        return this.m_experience;
    }

    public set experience(value: number) {
        if (value < 0)
            throw new Error("Experience value cannot be negative.");

        this.m_experience = value;
    }

    public get isActive(): boolean {
        return this.m_activeAction != null;
    }

    public get progress(): number {
        return this.m_progress;
    }

    public get activeAction(): T | null {
        return this.m_activeAction;
    }

    protected get player(): IPlayerContext {
        return this.m_playerContext;
    }

    constructor(skill: Skill, playerContext: IPlayerContext) {
        this.m_playerContext = playerContext;
        this.m_skill = skill;
        this.m_experience = 0;
        this.m_level = 0;
        this.m_progress = 0;
        this.m_activeAction = null;
    }

    public addExperience(value: number) {
        if (value < 0)
            throw new Error("Experience value cannot be negative.");
        this.m_experience += value;
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            const action = this.m_activeAction!;
            this.m_progress += deltaTime;

            while (this.m_progress >= action.actionTime) {
                this.m_progress -= action.actionTime;

                this.onActionComplete(action);

                const actionStartResult = this.canStartAction(action);
                if (!actionStartResult.canStart) {
                    this.onActionStopped(action, actionStartResult.reason!);
                    break;
                }
            }
        }
    }

    public isRunningAction(recipe: BaseRecipe): boolean {
        return (this.m_activeAction != null) && this.m_activeAction === recipe;
    }

    public startAction(recipe: BaseRecipe) {
        // TODO: Support concurrent actions.
        this.m_progress = 0;
        this.m_activeAction = <T>recipe;
    }

    public stopAction(recipe: BaseRecipe) {
        // TODO: Support concurrent actions.
        const action = <T>recipe;
        if (this.m_activeAction === action) {
            this.m_progress = 0;
            this.m_activeAction = null;
            this.onActionStopped(action, ActionStoppedReason.ManualStop);
        }
    }

    public stopAllActions(): void {
        const action = <T>this.m_activeAction;
        this.m_activeAction = null;
        this.m_progress = 0;
        this.onActionStopped(action, ActionStoppedReason.ManualStop);
    }

    public abstract canStartAction(action: T): IActionStartResult
    protected abstract onActionComplete(completedAction: T): void;
    protected abstract onActionStopped(abortedAction: T, reason: ActionStoppedReason): void;
}