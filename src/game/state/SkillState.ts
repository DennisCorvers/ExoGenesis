import { Skill } from "../skills/Skill";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";
import { IPlayerContext } from "../systems/IPlayerContext";
import { IActionStartResult } from "./ActionStartResult";
import { ActionStoppedReason } from "./ActionStartReason";
import { ISkillState } from "./ISkillState";
import { EventBus } from "@game/events/EventBus";
import { SkillExperienceChangedEvent } from "@game/events/skill/SkillExpChangedEvent";
import { ActionStoppedEvent } from "@game/events/skill/ActionStoppedEvent";
import { ActionEvent } from "@game/events/skill/ActionEvent";
import { start } from "repl";

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

    public get expToNextLevel(): number {
        throw new Error("Method not implemented.");
    }

    public get progressToNextLevel(): number {
        throw new Error("Method not implemented.");
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
        this.m_level = 1;
        this.m_progress = 0;
        this.m_activeAction = null;
    }

    public addExperience(value: number) {
        if (value <= 0)
            return;

        const xp = this.m_experience;
        this.m_experience += value;

        if (xp !== this.m_experience)
            EventBus.instance.publish(`${this.skill.id}.expChanged`, new SkillExperienceChangedEvent(this, xp, this.m_experience));

        // Verify levelup

    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            const action = this.m_activeAction!;
            this.m_progress += deltaTime;

            while (this.m_progress >= action.actionTime) {
                this.m_progress -= action.actionTime;
                this.handleActionCompleted(action);

                const actionStartResult = this.canStartAction(action);
                if (!actionStartResult.canStart) {
                    this.handleActionStopped(action, actionStartResult.reason!);
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
        const action = <T>recipe;
        const startResult = this.canStartAction(action);
        if (startResult.canStart) {
            this.m_progress = 0;
            this.m_activeAction = action;
        }
        else {
            throw new Error(`Unable to start action: ${ActionStoppedReason[startResult.reason!]}`)
        }
    }

    public stopAction(recipe: BaseRecipe) {
        // TODO: Support concurrent actions.
        const action = <T>recipe;
        this.handleActionStopped(action, ActionStoppedReason.ManualStop);
    }

    public stopAllActions(): void {
        // TODO: Introduce logic to stop multiple actions
        if (this.m_activeAction != null) {
            this.handleActionStopped(this.m_activeAction, ActionStoppedReason.ManualStop);
        }
    }

    private handleActionCompleted(action: T) {
        if (action != null) {
            this.onActionComplete(action);
            EventBus.instance.publish(`${this.skill.id}.actionComplete`, new ActionEvent(this, action, true));
        }
    }

    private handleActionStopped(action: T, reason: ActionStoppedReason): void {
        if (this.m_activeAction === action) {
            this.m_progress = 0;
            this.m_activeAction = null;
            this.onActionStopped(action, ActionStoppedReason.ManualStop);

            EventBus.instance.publish(`${this.skill.id}.actionStopped`, new ActionStoppedEvent(this, action, reason));
        }
    }

    public abstract canStartAction(action: T): IActionStartResult

    protected abstract onActionStart(action: T): void
    protected abstract onActionComplete(action: T): void
    protected abstract onActionStopped(action: T, reason: ActionStoppedReason): void
}