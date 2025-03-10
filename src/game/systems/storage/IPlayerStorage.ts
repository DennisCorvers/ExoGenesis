import { IStorageTab } from "./IStorageTab";
import { IStorageManager } from "./IStorageManager";

export interface IPlayerStorage extends IStorageManager {
        get storageTabs(): readonly IStorageTab[];
}