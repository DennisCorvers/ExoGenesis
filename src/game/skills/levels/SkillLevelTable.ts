import { ILevelTable } from "./ILevelTable";

export class SkillLevelTable implements ILevelTable {
    private constA: number = Math.pow(2, 1 / 7);
    private constB: number = (Math.pow(2, 1 / 7) - 1) / 75;

    private m_expTable: number[] = [0];
    private m_cumulativeSum: number = 0;

    constructor() { }

    public experienceForLevel(level: number): number {
        if (level < 1) {
            return 0;
        }

        const index = level - 1;
        while (this.m_expTable.length <= index) {
            const nextLevel = this.m_expTable.length + 1;
            const n = nextLevel - 1;

            this.m_cumulativeSum += n + 300 * Math.pow(2, n / 7);

            const xpNext = Math.floor(this.m_cumulativeSum / 4);
            this.m_expTable.push(xpNext);
        }

        return this.m_expTable[index];
    }

    public levelAtExperience(experience: number): number {
        if (experience <= 0) {
            return 1;
        }

        const levelEstimate = Math.floor(7 * Math.log2(this.constA + this.constB * experience)) - 1;
        if (experience > this.experienceForLevel(levelEstimate + 1)) {
            return levelEstimate + 1;
        }

        return levelEstimate;
    }

    public getExpToNextLevel(currentLevel: number): number {
        if (currentLevel < 1) {
            return 0;
        }

        const currentLevelExp = this.experienceForLevel(currentLevel);
        const totalExpForLevel = this.experienceForLevel(currentLevel + 1);

        return totalExpForLevel - currentLevelExp;
    }

    public getProgress(currentExperience: number): number {

        const currentLevel = this.levelAtExperience(currentExperience);
        const expCurrentLevel = this.experienceForLevel(currentLevel);
        const expNextLevel = this.experienceForLevel(currentLevel + 1);

        return ((currentExperience - expCurrentLevel) / (expNextLevel - expCurrentLevel)) * 100;
    }
}