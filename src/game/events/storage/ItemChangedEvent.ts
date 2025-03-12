import { IStorageSlot } from "@game/systems/storage/IStorageSlot";
import { GameEvent } from "../GameEvent";

export class ItemChangedEvent extends GameEvent {
    private m_slot: IStorageSlot;
    private m_oldAmount: number;
    private m_newAmount: number;

    public get item(): IStorageSlot {
        return this.m_slot;
    }

    public get oldAmount(): number {
        return this.m_oldAmount;
    }

    public get newAmount(): number {
        return this.m_newAmount;
    }

    constructor(item: IStorageSlot, oldAmount: number, newAmount: number) {
        super()
        this.m_slot = item;
        this.m_oldAmount = oldAmount;
        this.m_newAmount = newAmount;
    }
}