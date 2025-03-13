import { MineralNode } from "@game/skills/requirements/MineralNode";
import { Skill } from "../skills/Skill";
import { IPlayerContext } from "../systems/IPlayerContext";
import { ActionStoppedReason } from "./ActionStartReason";
import { ActionStartResult } from "./ActionStartResult";
import { SkillState } from "./SkillState";
import { Miningtool } from "@game/entities/Miningtool";

export class MiningState extends SkillState<MineralNode> {
    private m_remainingNodeHealth: number;
    private m_partialMinedNode: MineralNode | null;
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
        this.m_partialMinedNode = null;
    }

    protected onActionStart(action: MineralNode): void {
        // If the (partial) harvested node is not set, or it's a different one, reset the remaining health.
        if (this.m_partialMinedNode == null || this.m_partialMinedNode.uid != action.uid) {
            this.m_partialMinedNode = action;
            this.m_remainingNodeHealth = action.health;
        }
    }

    protected onActionComplete(completedAction: MineralNode): void {
        const pickaxe = this.m_selectedPickaxe;
        if (pickaxe == null)
            return;

        const damage = this.calculateDamage(pickaxe, completedAction);
        this.m_remainingNodeHealth -= damage;

        // Node isn't fully mined yet.
        if (this.m_remainingNodeHealth > 0) {
            this.addExperience(1);
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
        // TODO: Add pickaxe damage variability with min/max damage.
        // Add increase in crit change on level unlocks
        const pickaxeDamage = Math.round(pickaxe.damage * (1 + (Math.random() * 0.5 - 0.25)));
        const hardnessSum = Math.min(0, pickaxe.hardness - action.hardness);
        const baseDamage = pickaxeDamage + hardnessSum;

        let totalDamage = baseDamage
        if (Math.random() < 0.1) {
            totalDamage += this.level;
        }

        return Math.max(1, totalDamage);
    }

    private awardItems(action: MineralNode) {
        // Include things like bonus items or random rolls.
        this.player.storage.addItem(action.item, action.itemAmount);
    }

    private awardExperience(action: MineralNode) {
        // Calculate experience bonusses
        this.addExperience(action.experienceReward);
    }
}
