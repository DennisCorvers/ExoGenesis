import { IDataProvider } from "@game/data/IDataProvider";
import { SidebarLayout } from "@game/ui/SidebarLayout";

export class Layout {
    public readonly sidebarLayout: SidebarLayout;

    constructor(dataProvider: IDataProvider) {
        this.sidebarLayout = dataProvider.sidebar;
    }
}