import { EventBus } from "../events/EventBus";
import { ActionEvent } from "../events/skill/ActionEvent";
import { ActionStoppedEvent } from "../events/skill/ActionStoppedEvent";
import { SimpleHarvestRecipe } from "../skills/requirements/SimpleHarvestRecipe";
import { Skill } from "../skills/Skill";
import { IPlayerContext } from "../systems/IPlayerContext";
import { ActionStoppedReason } from "./ActionStartReason";
import { ActionStartResult } from "./ActionStartResult";
import { SkillState } from "./SkillState";

export class BiomassExtractionState extends SkillState<SimpleHarvestRecipe> {
    constructor(skill: Skill, playerContext: IPlayerContext) {
        super(skill, playerContext)
    }

    protected onActionStart(action: SimpleHarvestRecipe): void {
    }

    protected onActionComplete(completedAction: SimpleHarvestRecipe): void {
    }

    protected onActionStopped(stoppedAction: SimpleHarvestRecipe, reason: ActionStoppedReason): void {
    }

    public canStartAction(action: SimpleHarvestRecipe): ActionStartResult {
        return ActionStartResult.success();
    }
}
