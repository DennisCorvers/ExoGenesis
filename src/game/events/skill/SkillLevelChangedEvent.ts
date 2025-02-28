import { ISkillState } from "../../state/ISkillState";
import { SkillEvent } from "../SkillEvent";

export class SkillLevelChangedEvent extends SkillEvent {
    private m_oldLevel: number;
    private m_newLevel: number;

    public get oldLevel(): number {
        return this.m_oldLevel;
    }

    public get newLevel(): number {
        return this.m_newLevel;
    }

    constructor(skill: ISkillState, oldlevel: number, newLevel: number) {
        super(skill);
        this.m_oldLevel = oldlevel;
        this.m_newLevel = newLevel;
    }
}