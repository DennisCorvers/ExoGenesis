export abstract class ResourceNode {
  private readonly m_id: string;
  private readonly m_experienceReward: number;
  private readonly m_levelRequirement: number;
  private readonly m_harvestingTime: number;
  private readonly m_rewards: string[];

  constructor(id: string, experienceReward: number, levelRequirement: number, harvestingTime: number, rewards: string[]) {
    this.m_id = id
    this.m_experienceReward = experienceReward
    this.m_levelRequirement = levelRequirement
    this.m_harvestingTime = harvestingTime
    this.m_rewards = rewards;
  }

  public get name(): string {
    return this.m_id;
  }

  public get experienceReward(): number {
    return this.m_experienceReward;
  }

  public get levelRequirement(): number {
    return this.m_levelRequirement;
  }

  public get harvestingTime(): number {
    return this.m_harvestingTime;
  }

  public get rewards(): string[] {
    return this.m_rewards;
  }
}
