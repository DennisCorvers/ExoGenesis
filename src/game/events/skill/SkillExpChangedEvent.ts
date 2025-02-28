import { ISkillState } from "../../state/ISkillState";
import { SkillEvent } from "../SkillEvent";

export class SkillExperienceChangedEvent extends SkillEvent {
    private m_oldExperience: number;
    private m_newExperience: number;

    public get oldExperience(): number {
        return this.m_oldExperience;
    }

    public get newExperience(): number {
        return this.m_newExperience;
    }

    constructor(skill: ISkillState, oldExperience: number, newExperience: number) {
        super(skill);
        this.m_oldExperience = oldExperience;
        this.m_newExperience = newExperience;
    }
}