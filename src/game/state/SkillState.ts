import { Skill } from "../skills/Skill";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";
import { IPlayerContext } from "../systems/IPlayerContext";
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
                this.onPostActionComplete(action);

                if (!this.canStartAction(action)) {
                    this.stopAction(action);
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
        }
    }

    public stopAllActions(): void {
        this.m_activeAction = null;
        this.m_progress = 0;
    }

    public abstract canStartAction(action: T): boolean
    protected abstract onActionComplete(completedAction: T): void;
    protected abstract onPostActionComplete(completedAction: T): void;
    protected abstract onActionStopped(stoppedAction: T): void;
    protected abstract onActionStarted(startedAction: T): void;
}