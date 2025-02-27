import { Item } from "../../entities/Item";
import { HarvestRecipe } from "./HarvestRecipe";

export class SimpleHarvestRecipe extends HarvestRecipe {
    private m_item: Item;
    private m_amount: number;

    public get item() {
        return this.m_item;
    }

    public get amount() {
        return this.m_amount;
    }

    constructor(namespace: string, name: string, item: Item, amount: number, experienceReward: number, levelRequirement: number, actionTime: number) {
        super(namespace, name, experienceReward, levelRequirement, actionTime)
        this.m_item = item;
        this.m_amount = amount;
    }
}