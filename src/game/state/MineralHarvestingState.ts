import { EventBus } from "../events/EventBus";
import { ActionEvent } from "../events/skill/ActionEvent";
import { ActionStartedEvent } from "../events/skill/ActionStartedEvent";
import { ActionStoppedEvent } from "../events/skill/ActionStoppedEvent";
import { SingleResourceRecipe } from "../skills/requirements/SingleResourceRecipe";
import { Skill } from "../skills/Skill";
import { IPlayerContext } from "../systems/IPlayerContext";
import { SkillState } from "./SkillState";

export class MineralHarvestingState extends SkillState<SingleResourceRecipe> {
    constructor(skill: Skill, playerContext: IPlayerContext) {
        super(skill, playerContext)
    }

    protected onActionComplete(completedAction: SingleResourceRecipe): void {
        // Add items and experience rewards.
        this.player.inventory.addItem(completedAction.item, completedAction.amount);
        this.addExperience(completedAction.experienceReward);


        const event = new ActionEvent(this, completedAction, true)
        EventBus.instance.publish("mineralharvesting.action", event);
    }

    protected onPostActionComplete(completedAction: SingleResourceRecipe) {

    }

    protected onActionStopped(stoppedAction: SingleResourceRecipe): void {
        const event = new ActionStoppedEvent(this);
        EventBus.instance.publish("mineralharvesting.stop", event);
    }

    protected onActionStarted(startedAction: SingleResourceRecipe): void {
        const event = new ActionStartedEvent(this);
        EventBus.instance.publish("mineralharvesting.start", event);
    }

    public canStartAction(action: SingleResourceRecipe): boolean {
        // TODO : Check for pickaxe / drill
        return true;
    }
}
