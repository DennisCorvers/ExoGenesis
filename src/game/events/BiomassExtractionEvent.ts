import { BiomassNode } from "../skills/BiomassNode";
import { SkillActionEvent } from "./SkillActionEvent";

export class BiomassExtractionEvent extends SkillActionEvent {
    public readonly biomassNode: BiomassNode;

    constructor(biomassNode: BiomassNode) {
        super()
        this.biomassNode = biomassNode
    }
}