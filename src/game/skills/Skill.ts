import { NamedObject } from "../core/NamedObject";
import { BaseRecipe } from "./requirements/BaseRecipe";

export abstract class Skill extends NamedObject {
    constructor(name: string) {
        super(name);
    }

    abstract isValidRecipe(recipe : BaseRecipe) : boolean;
}