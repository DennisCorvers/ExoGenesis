import { Package } from "@game/core/Package";
import { InventoryLayout } from "../../ui/InventoryLayout";
import { SidebarLayout } from "../../ui/SidebarLayout";
import { IDataProvider } from "@game/data/IDataProvider";

export class LayoutRegistry {
    public readonly sidebarLayout: SidebarLayout;
    public readonly inventoryLayout: InventoryLayout;

    constructor() {
        this.sidebarLayout = new SidebarLayout();
        this.inventoryLayout = new InventoryLayout();
    }

    public registerData(pkg: Package, data: any, dataProvider: IDataProvider) {
        if (data.sidebar != null)
            this.sidebarLayout.registerData(pkg, data.sidebar, dataProvider);
        if (data.inventory != null)
            this.inventoryLayout.registerData(pkg, data.inventory, dataProvider);
    }
}