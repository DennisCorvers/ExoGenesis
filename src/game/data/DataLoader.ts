import { SkillRegistry } from "@game/core/Registries/SkillRegistry";
import { PackageRegistry } from "@game/core/PackageRegistry";
import { IDataProvider } from "./IDataProvider";
import { NamedObjectRegistry } from "@game/core/NamedObjectRegistry";
import { Item } from "@game/entities/Item";
import { Package } from "@game/core/Package";
import { BiomassExtraction, MineralHarvesting } from "@game/skills";
import { GameContext } from "@game/core/GameContext";
import { SidebarLayout } from "@game/ui/SidebarLayout";

export class DataLoader implements IDataProvider {
    readonly packages: PackageRegistry;
    readonly skills: SkillRegistry;
    readonly items: NamedObjectRegistry<Item>;
    readonly sidebar: SidebarLayout;

    private m_defaultPackage: Package;

    constructor() {
        this.packages = new PackageRegistry();
        this.skills = new SkillRegistry();
        this.items = new NamedObjectRegistry<Item>();
        this.sidebar = new SidebarLayout();

        this.m_defaultPackage = this.packages.registerPackage('exo', 'ExoGenesis');

        this.setupSkills();
    }

    // Creates the empty skills so the game logic can interact.
    private setupSkills() {
        this.skills.registerObject(new MineralHarvesting(this.m_defaultPackage));
        this.skills.registerObject(new BiomassExtraction(this.m_defaultPackage));
    }

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
        if (data.sidebar != null)
            this.registerSidebar(pkg, data.sidebar);
    }

    private registerSkills(pkg: Package, skillsData: any) {
        skillsData.forEach((skillData: any) => {
            const skill = this.skills.getObject(skillData.id);
            skill.registerData({
                packageInfo: pkg,
                data: skillData,
                dataProvider: this
            });
        });
    }

    private registerItems(pkg: Package, itemData: any) {
        itemData.forEach((item: any) => {
            this.items.registerObject(new Item({
                packageInfo: pkg,
                data: item,
                dataProvider: this
            }))
        });
    }

    private registerSidebar(pkg: Package, sidebarData: any) {
        this.sidebar.registerData({ packageInfo: pkg, data: sidebarData, dataProvider: this });
    }

    public createGameContext(): GameContext {
        return new GameContext(this);
    }
}