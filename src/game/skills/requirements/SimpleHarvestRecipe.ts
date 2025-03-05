import { Package } from "@game/core/Package";
import { Item } from "../../entities/Item";
import { HarvestRecipe } from "./HarvestRecipe";
import { IDataProvider } from "@game/data/IDataProvider";

export class SimpleHarvestRecipe extends HarvestRecipe {
    private m_item: Item;
    private m_amount: number;

    public get item() {
        return this.m_item;
    }

    public get amount() {
        return this.m_amount;
    }

    constructor(pkg: Package, data: any, dataProvider: IDataProvider) {
        super(pkg, data)
        this.m_item = dataProvider.items.getObject(data.item);
        this.m_amount = data.amount;
    }
}