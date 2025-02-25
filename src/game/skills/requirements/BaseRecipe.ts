import { NamedObject } from "../../core/NamedObject";
import { Player } from "../../entities/Player";

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

    constructor(localID: string, experienceReward: number, levelRequirement: number, actionTime: number) {
        super(localID)
        this.m_experienceReward = experienceReward
        this.m_levelRequirement = levelRequirement
        this.m_actionTime = actionTime
    }
}
