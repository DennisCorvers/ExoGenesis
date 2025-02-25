import { Skill } from "../skills";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";

// Defines a base interface for all skill states that offers only immutable data.
export interface IPlayerSkillData {
    skill: Skill;
    level: number;
    experience: number;
    isActive: boolean;
    progress: number;

    isRunningAction(recipe: BaseRecipe): boolean;
}