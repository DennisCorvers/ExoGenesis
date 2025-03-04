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

    constructor(pkg: Package, data: any) {
        super(pkg, data.id, data.name)
        this.m_experienceReward = data.experienceReward
        this.m_levelRequirement = data.levelRequirement
        this.m_actionTime = data.actionTime
    }
}