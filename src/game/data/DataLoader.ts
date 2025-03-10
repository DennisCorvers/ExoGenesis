import { SkillRegistry } from "@game/core/Registries/SkillRegistry";
import { PackageRegistry } from "@game/core/Registries/PackageRegistry";
import { IDataProvider } from "./IDataProvider";
import { NamedObjectRegistry } from "@game/core/Registries/NamedObjectRegistry";
import { Item } from "@game/entities/Item";
import { Package } from "@game/core/Package";
import { BiomassExtraction, MineralHarvesting } from "@game/skills";
import { GameContext } from "@game/core/GameContext";
import { ItemBuilder } from "./Builders/ItemBuilder";
import { LayoutRegistry } from "@game/core/Registries/LayoutRegistry";

export class DataLoader implements IDataProvider {
    readonly packages: PackageRegistry;
    readonly skills: SkillRegistry;
    readonly items: NamedObjectRegistry<Item>;
    readonly layout: LayoutRegistry;

    private m_defaultPackage: Package;

    constructor() {
        this.packages = new PackageRegistry();
        this.skills = new SkillRegistry();
        this.items = new NamedObjectRegistry<Item>();
        this.layout = new LayoutRegistry();

        this.m_defaultPackage = this.packages.registerPackage('exo', 'ExoGenesis');

        this.setupSkills();
    }

    // Creates the empty skills so the game logic can interact.
    private setupSkills() {
        this.skills.registerObject(new MineralHarvesting(this.m_defaultPackage));
        this.skills.registerObject(new BiomassExtraction(this.m_defaultPackage));
    }

    public async downloadAndRegisterPackage(url: string): Promise<void> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const response = await fetch(url, { method: 'GET', headers, });
        if (!response.ok) {
            throw new Error(`Could not fetch data package with URL: ${url}. Error ${response.status}: ${response.statusText}`);
        }

        const dataPackage = await response.json();
        this.registerPackage(dataPackage);
    };

    public registerPackage(data: any) {
        const packageID = data.packageID;
        const packageName = data.displayName;

        if (packageID == null) {
            throw new Error("Package does not have a valid identifier.");
        }

        let pkg: Package | null = this.packages.getPackage(packageID);
        if (pkg == null) {
            pkg = this.packages.registerPackage(packageID, packageName);
        }

        if (data.data !== undefined) {
            this.registerGameData(pkg, data.data);
        }
    }

    private registerGameData(pkg: Package, data: any) {
        if (data.items != null)
            this.registerItems(pkg, data.items);
        if (data.skills != null)
            this.registerSkills(pkg, data.skills);
        if (data.layout != null)
            this.registerLayout(pkg, data.layout);
    }

    private registerSkills(pkg: Package, skillsData: any) {
        skillsData.forEach((skillData: any) => {
            const skill = this.skills.getObject(skillData.id);
            skill.registerData(pkg, skillData, this);
        });
    }

    private registerItems(pkg: Package, itemData: any) {
        const itemBuilder = new ItemBuilder(this.items, this);
        itemBuilder.registerItems(pkg, itemData);
    }

    private registerLayout(pkg: Package, layoutData: any) {
        this.layout.registerData(pkg, layoutData, this);
    }

    public createGameContext(): GameContext {
        return new GameContext(this);
    }
}