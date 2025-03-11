import { Item } from "../../entities/Item";
import { GameEvent } from "../GameEvent";

export class ItemChangedEvent extends GameEvent {
    private m_item: Item;
    private m_oldAmount: number;
    private m_newAmount: number;

    public get item(): Item {
        return this.m_item;
    }

    public get oldAmount(): number {
        return this.m_oldAmount;
    }

    public get newAmount(): number {
        return this.m_newAmount;
    }

    constructor(item: Item, oldAmount: number, newAmount: number) {
        super()
        this.m_item = item;
        this.m_oldAmount = oldAmount;
        this.m_newAmount = newAmount;
    }
}