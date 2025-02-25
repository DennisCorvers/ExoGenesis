import { Skill } from "../skills/Skill";
import { MineralHarvesting, BiomassExtraction } from "../skills";
import { ObjectRegistry } from "./ObjectRegistry";

export class SkillRegistry extends ObjectRegistry<Skill> {
    public get mineralHarvesting(): MineralHarvesting {
        return super.getObjectByType(MineralHarvesting) as MineralHarvesting;
    }

    public get biomassExtraction(): BiomassExtraction {
        return super.getObjectByType(BiomassExtraction) as BiomassExtraction;
    }

    constructor() {
        super();

        this.registerSkills();
    }

    public registerSkills() {
        this.registerObject(new MineralHarvesting());
        this.registerObject(new BiomassExtraction());
    }
}