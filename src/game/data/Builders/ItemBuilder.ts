import { Package } from "@game/core/Package";
import { IDataProvider } from "../IDataProvider";
import { NamedObjectRegistry } from "@game/core/Registries/NamedObjectRegistry";
import { Item } from "@game/entities/Item";
import { PatchRoutesOnNavigationFunction } from "react-router-dom";
import { Miningtool } from "@game/entities/Miningtool";

export class ItemBuilder {
    private m_itemRegistry: NamedObjectRegistry<Item>
    private m_dataProvider: IDataProvider;

    constructor(itemRegistry: NamedObjectRegistry<Item>, dataProvider: IDataProvider) {
        this.m_itemRegistry = itemRegistry;
        this.m_dataProvider = dataProvider;
    }

    public registerItems(pkg: Package, items: any) {
        items.forEach((item: any) => {
            this.m_itemRegistry.registerObject(this.buildItem(pkg, item));
        });
    }

    private buildItem(pkg: Package, itemData: any): Item {
        const itemType = itemData.type;
        switch (itemType) {
            case "pickaxe":
                return new Miningtool(pkg, itemData);
            case "hatchet":
            case "material":
                return new Item(pkg, itemData);
            default:
                return new Item(pkg, itemData);
        }

    }
}