import { ISkillState } from "../state/ISkillState";
import { GameEvent } from "./GameEvent";

export class SkillEvent extends GameEvent {
    private m_skillState: ISkillState;

    public get skillState(): ISkillState {
        return this.m_skillState;
    }

    constructor(skillState: ISkillState) {
        super();
        this.m_skillState = skillState;
    }
}