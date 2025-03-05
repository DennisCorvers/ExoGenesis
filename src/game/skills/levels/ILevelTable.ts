export interface ILevelTable {
    experienceForLevel(level: number): number;

    levelAtExperience(experience: number): number;

    getExpToNextLevel(currentLevel: number): number;

    getProgress(currentExperience: number): number;
}