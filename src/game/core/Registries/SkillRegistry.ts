import { IDataContext } from "@game/data/IDataContext";
import { NamedObjectRegistry } from "./NamedObjectRegistry";
import { BiomassExtraction, MineralHarvesting, Skill } from "@game/skills";

export class SkillRegistry extends NamedObjectRegistry<Skill> {
    private m_skillTypeMap: Map<Function, Skill> = new Map();
    public get mineralHarvesting(): MineralHarvesting {
        return this.getSkillSafe(MineralHarvesting) as MineralHarvesting;
    }

    public get biomassExtraction(): BiomassExtraction {
        return this.getSkillSafe(BiomassExtraction) as BiomassExtraction;
    }

    constructor() {
        super();
        this.m_skillTypeMap = new Map<Function, Skill>();
    }

    public getSkill<T extends Skill>(type: new (...args: any[]) => T): T {
        const skill = this.m_skillTypeMap.get(type);
        if (!skill) {
            throw new Error(`Skill of type ${type.name} is not registered.`);
        }
        return skill as T;
    }

    public getSkillSafe<T extends Skill>(type: new (...args: any[]) => T): T | null {
        const skill = this.m_skillTypeMap.get(type);
        return skill ? (skill as T) : null;
    }

    public registerObject(skill: Skill): Skill {
        super.registerObject(skill);
        this.m_skillTypeMap.set(skill.constructor, skill);
        return skill;
    }

    public getOrAddSkill<T extends Skill>(skill: new (...args: any[]) => T, dataContext: IDataContext): T {
        let skillInstance = this.getSkillSafe(skill);

        if (skillInstance === null) {
            skillInstance = new skill(dataContext);
            this.registerObject(skillInstance);
        }
        return skillInstance;
    }
}