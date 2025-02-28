import { Player } from "../../entities/Player";
import { BaseRecipe } from "./BaseRecipe";

export class CraftingRecipe extends BaseRecipe {
    playerCanStart(player: Player): boolean {
        throw new Error("Method not implemented.");
    }
}