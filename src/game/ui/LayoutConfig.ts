import { ISerializable } from "@game/data/ISerializable";

export interface ILayoutConfig {
    selectedInventoryTab: string | null;
    selectedInventorySort: string | null;
    inventorySortDescending: boolean;
}
export class LayoutConfig implements ILayoutConfig, ISerializable {
    private m_selectedInventoryTab: string | null;
    private m_selectedInventorySort: string | null;
    private m_inventorySortDescending: boolean;

    public get selectedInventoryTab(): string | null {
        return this.m_selectedInventoryTab;
    }
    public set selectedInventoryTab(value: string) {
        this.m_selectedInventoryTab = value;
    }

    public get selectedInventorySort(): string | null {
        return this.m_selectedInventorySort;
    }
    public set selectedInventorySort(value: string) {
        this.m_selectedInventorySort = value;
    }

    public get inventorySortDescending(): boolean {
        return this.m_inventorySortDescending;
    }
    public set inventorySortDescending(value: boolean) {
        this.m_inventorySortDescending = value;
    }

    constructor() {
        this.m_selectedInventoryTab = null;
        this.m_selectedInventorySort = null;
        this.m_inventorySortDescending = true;
    }

    loadData(): void {
        throw new Error("Method not implemented.");
    }
}