import { ISkillManager } from "./ISkillManager";
import { IStorageManager } from "./storage/IStorageManager";

export interface IPlayerContext {
    get storage(): IStorageManager;
    get skills() : ISkillManager;
}