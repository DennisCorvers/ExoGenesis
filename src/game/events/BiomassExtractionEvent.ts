import { SingleResourceRecipe } from "../skills/requirements/SingleResourceRecipe";
import { SkillActionEvent } from "./SkillActionEvent";

export class BiomassExtractionEvent extends SkillActionEvent {
    public readonly biomassNode: SingleResourceRecipe;

    constructor(biomassNode: SingleResourceRecipe) {
        super()
        this.biomassNode = biomassNode
    }
}