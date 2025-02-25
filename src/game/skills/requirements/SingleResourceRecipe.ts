import { Item } from "../../entities/Item";
import { Player } from "../../entities/Player";
import { ResourceRecipe } from "./ResourceRecipe";

export class SingleResourceRecipe extends ResourceRecipe {

    private m_item: Item;
    private m_amount: number;

    public get item() {
        return this.m_item;
    }

    public get amount() {
        return this.m_amount;
    }

    constructor(localID: string, item: Item, amount: number, experienceReward: number, levelRequirement: number, actionTime: number) {
        super(localID, experienceReward, levelRequirement, actionTime)
        this.m_item = item;
        this.m_amount = amount;
    }

    public playerCanStart(player: Player): boolean {
        // TODO: Verify if player can do this action
        return true;
    }
}