import { Skill } from "@game/skills/Skill";
import { SidebarCategory, SidebarEntry } from "./SidebarEntry";
import { Package } from "@game/core/Package";
import { IDataProvider } from "@game/data/IDataProvider";

export class SidebarLayout {
    private m_sidebar: SidebarCategory[] = [];

    public get sidebarData(): SidebarCategory[] {
        return this.m_sidebar;
    }

    constructor() {
        this.m_sidebar = [];
    }

    private getOrCreateCategory(categoryName: string): SidebarCategory {
        let category = this.m_sidebar.find(category => category.name === categoryName);

        if (!category) {
            // If the category does not exist, create it and push to m_sidebar
            category = new SidebarCategory(categoryName);
            this.m_sidebar.push(category);
        }

        return category;
    }

    public registerData(pkg: Package, data: any, dataProvider: IDataProvider) {
        data.forEach((page: any) => {
            const categoryName = page.name;
            const items = page.items;

            // Add category
            const category = this.getOrCreateCategory(categoryName);

            // Add items
            items.forEach((sidebarItem: any) => {
                let skill: Skill | null = null;
                if (sidebarItem.skillID !== undefined) {
                    skill = dataProvider.skills.getObject(sidebarItem.skillID);
                }

                category.addEntry(new SidebarEntry(
                    sidebarItem.id,
                    sidebarItem.icon,
                    sidebarItem.route,
                    sidebarItem.text,
                    sidebarItem.page,
                    skill,
                ))
            });
        });
    }
}

