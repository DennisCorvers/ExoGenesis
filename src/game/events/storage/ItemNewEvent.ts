import { Item } from "../../entities/Item";
import { GameEvent } from "../GameEvent";

export class ItemNewEvent extends GameEvent {
    private m_item: Item;

    public get item(): Item {
        return this.m_item;
    }

    constructor(item: Item) {
        super()
        this.m_item = item;
    }
}