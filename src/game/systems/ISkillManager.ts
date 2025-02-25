import { Skill } from "../skills";
import { BaseRecipe } from "../skills/requirements/BaseRecipe";
import { ISkillState } from "../state/ISkillState";

export interface ISkillManager {
    get activeSkills(): ISkillState[];

    get skillStates(): ISkillState[];

    get playerSelectedSkill(): ISkillState | null;

    get isPlayerBusy(): boolean;

    getSkill(skill: Skill): ISkillState;

    startPlayerAction(skill: Skill, action: BaseRecipe): void;

    stopPlayerAction(skill: Skill, action: BaseRecipe): void;
}