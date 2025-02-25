import { SingleResourceRecipe } from "../skills/requirements/SingleResourceRecipe";
import { SkillActionEvent } from "./SkillActionEvent";

export class MineralHarvestingActionEvent extends SkillActionEvent {
    public readonly mineralNode: SingleResourceRecipe;

    constructor(mineralNode: SingleResourceRecipe) {
        super()
        this.mineralNode = mineralNode
    }
}