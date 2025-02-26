import { BaseRecipe } from "../../skills/requirements/BaseRecipe";
import { ActionStoppedReason } from "../../state/ActionStartReason";
import { ISkillState } from "../../state/ISkillState";
import { SkillEvent } from "../SkillEvent";

export class ActionStoppedEvent extends SkillEvent {
    private m_stopReason: ActionStoppedReason;
    private m_action: BaseRecipe;

    public get stopReason(): ActionStoppedReason {
        return this.m_stopReason;
    }

    public get action(): BaseRecipe {
        return this.m_action;
    }

    public get isManualStop(): boolean {
        return this.m_stopReason === ActionStoppedReason.ManualStop;
    }

    constructor(skill: ISkillState, action: BaseRecipe, stopReason: ActionStoppedReason) {
        super(skill);
        this.m_stopReason = stopReason;
        this.m_action = action;
    }
}