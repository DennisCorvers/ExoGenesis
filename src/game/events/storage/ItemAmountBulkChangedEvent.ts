import { Item } from "../../entities/Item";
import { GameEvent } from "../GameEvent";

export interface ItemChange {
    item: Item;
    oldAmount: number;
    newAmount: number;
}

export class ItemAmountChangedBulkEvent extends GameEvent {
    private m_changes: ItemChange[];

    public get changes(): ItemChange[] {
        return this.m_changes;
    }

    public get changeCount(): number {
        return this.m_changes.length;
    }

    public get any(): boolean {
        return this.m_changes.length > 0;
    }

    public get first(): ItemChange {
        return this.m_changes[0];
    }

    constructor(itemChanges: ItemChange[]) {
        super();
        this.m_changes = itemChanges;
    }
}