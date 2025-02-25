import { EventBus } from "../events/EventBus";
import { MineralHarvestingActionEvent } from "../events/MineralHarvestingEvent";
import { SingleResourceRecipe } from "../skills/requirements/SingleResourceRecipe";
import { Skill } from "../skills/Skill";
import { SkillState } from "./SkillState";

export class MineralHarvestingState extends SkillState<SingleResourceRecipe> {

    constructor(skill : Skill) {
        super(skill)
    }

    public canStart(action: SingleResourceRecipe): boolean {
        return true;
    }

    protected completeAction(completedAction: SingleResourceRecipe): void {
        super.addExperience(completedAction.experienceReward);
        console.log(super.experience);
        const event = new MineralHarvestingActionEvent(completedAction);
        EventBus.instance.publish(event);
    }

    protected postCompleteAction(completedAction: SingleResourceRecipe) {
        if (!this.canStart(completedAction)) {
            this.m_activeAction = null;
        }
    }
}
