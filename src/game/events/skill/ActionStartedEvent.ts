import { ISkillState } from "../../state/ISkillState";
import { SkillEvent } from "../SkillEvent";

export class ActionStartedEvent extends SkillEvent {
    constructor(skill: ISkillState) {
        super(skill)
    }
}