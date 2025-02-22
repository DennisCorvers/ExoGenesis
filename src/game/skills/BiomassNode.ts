import { ResourceNode } from "../core/ResourceNode"

export class BiomassNode extends ResourceNode {
    constructor(
      id: string,
      experienceReward: number,
      levelRequirement: number,
      harvestingTime: number,
      rewards: string[]
    ) {
      super(id, experienceReward, levelRequirement, harvestingTime, rewards);
    }
  }
  