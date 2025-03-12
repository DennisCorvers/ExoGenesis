import { GameEvent } from "../GameEvent";

export class SizeChangedEvent extends GameEvent {
    private m_storageCount: number;
    private m_storageSize: number;

    public get storageCount(): number {
        return this.m_storageCount;
    }

    public get storageSize(): number {
        return this.m_storageSize;
    }

    constructor(storageCount: number, storageSize: number) {
        super();
        this.m_storageCount = storageCount;
        this.m_storageSize = storageSize;
    }

}