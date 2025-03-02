import { SimpleHarvestRecipe } from "../skills/requirements/SimpleHarvestRecipe";
import { Skill } from "../skills/Skill";
import { IPlayerContext } from "../systems/IPlayerContext";
import { ActionStoppedReason } from "./ActionStartReason";
import { ActionStartResult } from "./ActionStartResult";
import { SkillState } from "./SkillState";

export class MineralHarvestingState extends SkillState<SimpleHarvestRecipe> {

    constructor(skill: Skill, playerContext: IPlayerContext) {
        super(skill, playerContext)
    }

    protected onActionComplete(completedAction: SimpleHarvestRecipe): void {
        // Add items and experience rewards.
        this.player.inventory.addItem(completedAction.item, completedAction.amount);
        this.addExperience(completedAction.experienceReward);
    }

    protected onActionStopped(action: SimpleHarvestRecipe, reason: ActionStoppedReason): void {
        
    }

    public canStartAction(action: SimpleHarvestRecipe): ActionStartResult {
        // TODO : Check for pickaxe / drill
        return ActionStartResult.success();
    }
}
