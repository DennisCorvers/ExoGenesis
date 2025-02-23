import { Skill } from "../skills/Skill"

export class SkillManager {
    private m_activeSkills: Map<string, Skill>;

    constructor() {
        this.m_activeSkills = new Map<string, Skill>();
    }
}