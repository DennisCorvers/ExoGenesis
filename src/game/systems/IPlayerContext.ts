import { IStorageManager } from "./StorageManager";

export interface IPlayerContext {
    get storage(): IStorageManager
    get inventory() : IStorageManager
}