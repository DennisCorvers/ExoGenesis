import { Package } from "@game/core/Package";
import { HarvestRecipe } from "./HarvestRecipe";
import { Item } from "@game/entities/Item";
import { IDataProvider } from "@game/data/IDataProvider";

export class MineralNode extends HarvestRecipe {
    private m_hardness: number;
    private m_nodeHealth: number;
    private m_rewardItem: Item;
    private m_amount: number;

    public get hardness(): number {
        return this.m_hardness;
    }

    public get health(): number {
        return this.m_nodeHealth;
    }

    public get item(): Item {
        return this.m_rewardItem;
    }

    public get itemAmount(): number {
        return this.m_amount;
    }

    constructor(pkg: Package, data: any, dataProvider: IDataProvider) {
        super(pkg, data)

        this.m_hardness = data.hardness;
        this.m_nodeHealth = data.nodeHealth;
        this.m_rewardItem = dataProvider.items.getObject(data.item);
        this.m_amount = data.amount;
    }
}