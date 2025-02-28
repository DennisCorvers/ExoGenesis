import { Package } from "@game/core/Package";
import { NamedObject } from "../../core/NamedObject";

export abstract class BaseRecipe extends NamedObject {
    private readonly m_experienceReward: number;
    private readonly m_levelRequirement: number;
    private readonly m_actionTime: number;

    public get experienceReward(): number {
        return this.m_experienceReward;
    }

    public get levelRequirement(): number {
        return this.m_levelRequirement;
    }

    public get actionTime(): number {
        return this.m_actionTime;
    }

    constructor(pkg: Package, id: string, name: string, experienceReward: number, levelRequirement: number, actionTime: number) {
        super(pkg, id, name)
        this.m_experienceReward = experienceReward
        this.m_levelRequirement = levelRequirement
        this.m_actionTime = actionTime
    }
}
