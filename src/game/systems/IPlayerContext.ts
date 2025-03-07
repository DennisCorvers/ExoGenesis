import { IStorageManager } from "./storage/IStorageManager";

export interface IPlayerContext {
    get storage(): IStorageManager
    get inventory() : IStorageManager
}