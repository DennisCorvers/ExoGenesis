import { ISkillState } from "../../state/ISkillState";
import { SkillEvent } from "../SkillEvent";

export class ActionStoppedEvent extends SkillEvent {
    private m_isManualStop: boolean;

    constructor(skill: ISkillState) {
        super(skill);
        this.m_isManualStop = false;
    }
}