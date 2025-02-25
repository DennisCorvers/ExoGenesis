import { Skill } from "../../skills/Skill";
import { ISkillState } from "../../state/ISkillState";
import { SkillEvent } from "../SkillEvent";

export class LevelupEvent extends SkillEvent {
    private m_level: number;

    public get level(): number {
        return this.m_level;
    }

    constructor(skill: ISkillState, level: number) {
        super(skill);
        this.m_level = level;
    }
}