import { EventBus } from "../events/EventBus";
import { MineralHarvestingActionEvent } from "../events/MineralHarvestingEvent";
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
        this.player.storage.addItem(completedAction.item, completedAction.amount);
        this.addExperience(completedAction.experienceReward);


        const event = new MineralHarvestingActionEvent(completedAction);
        EventBus.instance.publish(event);
    }

    protected onPostActionComplete(completedAction: SingleResourceRecipe) {

    }

    protected onActionStopped(stoppedAction: SingleResourceRecipe): void {

    }

    protected onActionStarted(startedAction: SingleResourceRecipe): void {

    }

    public canStartAction(action: SingleResourceRecipe): boolean {
        return true;
    }
}
