import { Skill } from "../skills";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";
import { IPlayerSkillData } from "./IPlayerSkillData";

export interface ISkillState extends IPlayerSkillData {
    skill: Skill;
    level: number;
    experience: number;
    isActive: boolean;
    progress: number;

    addExperience(value: number): void;
    update(deltaTime: number): void;

    isRunningAction(recipe: BaseRecipe): boolean;
    startAction(recipe: BaseRecipe): void;
    stopAction(recipe: BaseRecipe): void;
    stopAllActions(): void;
}