import { IInventoryTab } from "./IInventoryTab";
import { Package } from "@game/core/Package";
import { IDataProvider } from "@game/data/IDataProvider";

export class InventoryLayout {
    private m_inventoryTabs: IInventoryTab[] = [];

    public get inventoryTabs(): IInventoryTab[] {
        return this.m_inventoryTabs;
    }

    constructor() { }

    public registerData(pkg: Package, data: any, dataProvider: IDataProvider) {
        function getItemTypes(tab: any): string[] {
            if (!Array.isArray(tab.itemTypes))
                return [];

            return tab.itemTypes.map((x: string) => x);
        }

        data.forEach((tab: any) => {
            this.m_inventoryTabs.push({
                tabID: tab.tabID,
                tabName: tab.tabName,
                media: tab.media,
                itemTypes: getItemTypes(tab),
            })
        })

        // Make sure the "all items" tab is always available.
        this.addDefaultEntry();
    }

    private addDefaultEntry() {
        const hasAllTab = this.m_inventoryTabs.some(x => x.itemTypes.length === 0);
        if (hasAllTab)
            return;

        const allTab: IInventoryTab = {
            tabID: 'defaulttab',
            tabName: 'Default Tab',
            media: '',
            itemTypes: []
        }

        this.m_inventoryTabs = [allTab, ...this.m_inventoryTabs];
    }
}

