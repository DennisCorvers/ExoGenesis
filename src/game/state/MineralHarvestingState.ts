import { EventBus } from "../events/EventBus";
import { ActionEvent } from "../events/skill/ActionEvent";
import { ActionStoppedEvent } from "../events/skill/ActionStoppedEvent";
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


        const event = new ActionEvent(this, completedAction, true)
        EventBus.instance.publish("mineralharvesting.action", event);
    }

    protected onActionStopped(stoppedAction: SimpleHarvestRecipe, reason : ActionStoppedReason): void {
        const event = new ActionStoppedEvent(this, stoppedAction, reason);
        EventBus.instance.publish("mineralharvesting.stop", event);
    }

    public canStartAction(action: SimpleHarvestRecipe): ActionStartResult {
        // TODO : Check for pickaxe / drill
        return ActionStartResult.success();
    }
}
