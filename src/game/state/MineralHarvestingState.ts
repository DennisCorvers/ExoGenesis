import { MineralNode } from "@game/skills/requirements/MineralNode";
import { Skill } from "../skills/Skill";
import { IPlayerContext } from "../systems/IPlayerContext";
import { ActionStoppedReason } from "./ActionStartReason";
import { ActionStartResult } from "./ActionStartResult";
import { SkillState } from "./SkillState";
import { Miningtool } from "@game/entities/Miningtool";

export class MineralHarvestingState extends SkillState<MineralNode> {
    private m_remainingNodeHealth: number;
    private m_selectedPickaxe: Miningtool | null;

    public get selectedPickaxe(): Miningtool | null {
        return this.m_selectedPickaxe;
    }

    public set selectedPickaxe(tool: Miningtool) {
        if (tool.requiredLevel > this.level) {
            throw new Error(`Level requirement for tool is not met.`);
        }

        this.m_selectedPickaxe = tool;
    }

    public get nodeHealth(): number {
        return this.m_remainingNodeHealth;
    }

    constructor(skill: Skill, playerContext: IPlayerContext) {
        super(skill, playerContext)
        this.m_remainingNodeHealth = -1;
        this.m_selectedPickaxe = null;
    }

    protected onActionStart(action: MineralNode): void {
        // Reset the node health if a different node is selected.
        this.m_remainingNodeHealth = action.health;
    }

    protected onActionComplete(completedAction: MineralNode): void {
        const pickaxe = this.m_selectedPickaxe;
        if (pickaxe == null)
            return;

        const damage = this.calculateDamage(pickaxe, completedAction);
        this.m_remainingNodeHealth -= damage;

        // Node isn't fully mined yet.
        if (this.m_remainingNodeHealth > 0) {
            // Award some experience?
            return;
        }

        this.m_remainingNodeHealth = Math.max(this.m_remainingNodeHealth + completedAction.health, 1);

        this.awardItems(completedAction);
        this.awardExperience(completedAction);
    }

    protected onActionStopped(action: MineralNode, reason: ActionStoppedReason): void {

    }

    public canStartAction(action: MineralNode): ActionStartResult {
        if (action.levelRequirement > this.level) {
            return ActionStartResult.failure(ActionStoppedReason.MissingLevelRequirement);
        }

        if (this.m_selectedPickaxe == null) {
            return ActionStartResult.failure(ActionStoppedReason.MissingPickaxe);
        }
        return ActionStartResult.success();
    }

    private calculateDamage(pickaxe: Miningtool, action: MineralNode): number {
        return this.level + pickaxe.damage + (pickaxe.hardness - action.hardness);
    }

    private awardItems(action: MineralNode) {
        // Include things like bonus items or random rolls.
        this.player.inventory.addItem(action.item, action.itemAmount);
    }

    private awardExperience(action: MineralNode) {
        // Calculate experience bonusses
        this.addExperience(action.experienceReward);
    }
}
