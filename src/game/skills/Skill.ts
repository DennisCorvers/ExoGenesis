import { IDataProvider } from "@game/data/IDataProvider";
import { NamedObject } from "../core/NamedObject";
import { BaseRecipe } from "./requirements/BaseRecipe";
import { Package } from "@game/core/Package";
import { IDataContext } from "@game/data/IDataContext";

export abstract class Skill extends NamedObject {
    //private m_unlockRequirements;
    //private m_levelRewards;
    //private pets??
    //private availablePlanets

    private m_levelCap: number = null!;
    private m_media: string = null!;

    public get LevelCap(): number {
        return this.m_levelCap;
    }

    public get Media(): string {
        return this.m_media;
    }

    constructor(pkg: Package, id: string, name: string, media: string) {
        super(pkg, id, name);
        this.m_media = media;
        this.m_levelCap = 0;
    }

    public registerData(dataContext: IDataContext) {

    }

    abstract isValidRecipe(recipe: BaseRecipe): boolean;
}