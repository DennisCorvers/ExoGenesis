import { BaseRecipe } from "../../skills/requirements/BaseRecipe";
import { ISkillState } from "../../state/ISkillState";
import { SkillEvent } from "../SkillEvent";

export class ActionEvent extends SkillEvent {
    private m_isSuccessful: boolean;
    private m_action: BaseRecipe;

    public get isSuccessfil(): boolean {
        return this.m_isSuccessful;
    }

    public get action(): BaseRecipe {
        return this.m_action;
    }

    constructor(skill: ISkillState, action: BaseRecipe, isSuccessful: boolean) {
        super(skill);
        this.m_action = action;
        this.m_isSuccessful = isSuccessful;
    }
}
