import { Package } from "@game/core/Package";
import { SidebarLayout } from "../../ui/SidebarLayout";
import { IDataProvider } from "@game/data/IDataProvider";

export class LayoutRegistry {
    public readonly sidebarLayout: SidebarLayout;

    constructor() {
        this.sidebarLayout = new SidebarLayout();
    }

    public registerData(pkg: Package, data: any, dataProvider: IDataProvider) {
        if (data.sidebar != null)
            this.sidebarLayout.registerData(pkg, data.sidebar, dataProvider);
    }
}