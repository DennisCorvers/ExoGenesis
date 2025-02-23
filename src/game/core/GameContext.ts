import { MineralHarvesting } from "../skills/MineralHarvesting";
import { Skill } from "../skills/Skill";

export class GameContext {
    // Use a Map where the key is the skill ID and value is the skill instance
    private readonly m_skills: Map<string, Skill>;
    private readonly m_isPaused: boolean;

    constructor() {
        this.m_skills = new Map();
        this.m_isPaused = false;

        this.registerSkills();
    }

    public update(deltaTime: number) {
        if (this.m_isPaused) return;

        this.m_skills.forEach(skill => {
            skill.update(deltaTime);
        });
    }

    private registerSkills() {
        this.registerSkill(new MineralHarvesting());
    }

    public getSkill(id: string): Skill {
        const skill = this.m_skills.get(id);
        if (!skill) {
            throw new Error(`Skill with ID ${id} not found.`);
        }
        return skill;
    }

    public getSkillByType<T extends Skill>(type: { new(): T }): T {
        for (const skill of this.m_skills.values()) {
            if (skill instanceof type) {
                return skill as T;
            }
        }
        throw new Error(`Skill of type ${type.name} not found.`);
    }

    private registerSkill(skill: Skill) {
        this.m_skills.set(skill.id, skill);
    }

    get skills(): Skill[] {
        return Array.from(this.m_skills.values());
    }
}
