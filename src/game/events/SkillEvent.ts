import { ISkillState } from "../state/ISkillState";
import { GameEvent } from "./GameEvent";

export class SkillEvent extends GameEvent {
    private m_skill: ISkillState;

    public get Skill(): ISkillState {
        return this.m_skill;
    }

    constructor(skill: ISkillState) {
        super();
        this.m_skill = skill;
    }
}