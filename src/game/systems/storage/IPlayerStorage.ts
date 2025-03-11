import { IStorageTab } from "./IStorageTab";
import { IStorageManager } from "./IStorageManager";
import { IStorageSlot } from "./IStorageSlot";

export interface IPlayerStorage extends IStorageManager {
        get storageTabs(): readonly IStorageTab[];

        moveItemsToTab(items: IStorageSlot[], tabID: number | undefined): boolean
}