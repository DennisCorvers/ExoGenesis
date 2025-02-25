import { Skill } from "../skills/Skill";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";

export interface ISkillState {
    skill: Skill;
    level: number;
    experience: number;
    isActive: boolean;
    progress: number;

    addExperience(value: number): void;
    update(deltaTime: number): void;
    canUpdate(): boolean;

    isRunningAction(recipe: BaseRecipe): boolean;
    startAction(recipe: BaseRecipe): void;
    stopAction(recipe: BaseRecipe): void;
    stopAllActions(): void;
}

export abstract class SkillState<T extends BaseRecipe> implements ISkillState {
    protected m_skill: Skill;
    protected m_level: number;
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

    constructor(skill: Skill) {
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
        if (this.canUpdate()) {
            this.m_progress += deltaTime;

            if (this.m_progress >= this.m_activeAction!.actionTime) {
                // Reset progress first before we set oncompletion.
                this.m_progress -= this.m_activeAction!.actionTime;
                this.completeAction(this.m_activeAction!);
                this.postCompleteAction(this.m_activeAction!);
            }
        }
    }

    public canUpdate(): boolean {
        return this.m_activeAction != null;
    }

    public isRunningAction(recipe: BaseRecipe): boolean {
        return (this.m_activeAction != null) && this.m_activeAction === recipe;
    }

    public startAction(recipe: BaseRecipe) {
        // TODO: Check if we can start.
        this.m_progress = 0;
        this.m_activeAction = <T>recipe;
    }

    public stopAction(recipe: BaseRecipe) {
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

    protected abstract completeAction(completedAction: T): void;
    protected abstract postCompleteAction(completedAction: T): void;
}