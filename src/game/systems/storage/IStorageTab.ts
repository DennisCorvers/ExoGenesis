import { IStorageSlot } from "./IStorageSlot";

export interface IStorageTab {
    readonly tabIndex: number;
    readonly tabItems: readonly IStorageSlot[];
    get tabImage(): string;
    get itemCount() : number;
}