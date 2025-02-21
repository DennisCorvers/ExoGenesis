import { MineralNode } from "../skills/MineralNode";
import { SkillActionEvent } from "./SkillActionEvent";

export class MineralHarvestingActionEvent extends SkillActionEvent {
    public readonly mineralNode: MineralNode;

    constructor(mineralNode: MineralNode) {
        super()
        this.mineralNode = mineralNode
    }
}