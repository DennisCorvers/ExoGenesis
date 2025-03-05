import { IDataProvider } from "@game/data/IDataProvider";
import { NamedObject } from "../core/NamedObject";
import { BaseRecipe } from "./requirements/BaseRecipe";
import { Package } from "@game/core/Package";
import { IDataContext } from "@game/data/IDataContext";
import { ILevelTable } from "./levels/ILevelTable";
import { SkillLevelTable } from "./levels/SkillLevelTable";

export abstract class Skill extends NamedObject {
    //private m_unlockRequirements;
    //private m_levelRewards;
    //private pets??
    //private availablePlanets

    private m_levelCap: number = null!;
    private m_media: string = null!;
    private m_skillLevelTable: ILevelTable;

    public get levelCap(): number {
        return this.m_levelCap;
    }

    public get media(): string {
        return this.m_media;
    }

    public get levelTable(): ILevelTable {
        return this.m_skillLevelTable;
    }

    constructor(pkg: Package, id: string, name: string, media: string) {
        super(pkg, id, name);
        this.m_media = media;
        this.m_levelCap = 0;
        this.m_skillLevelTable = new SkillLevelTable();
    }

    public registerData(dataContext: IDataContext) {
        this.m_levelCap = dataContext.data.levelCap;
    }

    abstract isValidRecipe(recipe: BaseRecipe): boolean;
}