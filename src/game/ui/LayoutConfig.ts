import { ISerializable } from "@game/data/ISerializable";

export interface ILayoutConfig {
    selectedStorageTab: number;
}

export class LayoutConfig implements ILayoutConfig, ISerializable {
    private m_selectedStorageTab: number;

    public get selectedStorageTab(): number {
        return this.m_selectedStorageTab;
    }
    public set selectedStorageTab(value: number) {
        this.m_selectedStorageTab = value;
    }

    constructor() {
        this.m_selectedStorageTab = 0;
    }

    loadData(): void {
        throw new Error("Method not implemented.");
    }
}