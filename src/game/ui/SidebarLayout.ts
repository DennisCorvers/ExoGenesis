import { Skill } from "@game/skills/Skill";
import { SidebarCategory, SidebarEntry } from "./SidebarEntry";
import { IDataContext } from "@game/data/IDataContext";

export class SidebarLayout {
    private m_sidebar: SidebarCategory[] = [];

    public get sidebarData(): SidebarCategory[] {
        return this.m_sidebar;
    }

    constructor() {
        this.m_sidebar = [];
    }

    public getOrCreateCategory(categoryName: string): SidebarCategory {
        let category = this.m_sidebar.find(category => category.name === categoryName);

        if (!category) {
            // If the category does not exist, create it and push to m_sidebar
            category = new SidebarCategory(categoryName);
            this.m_sidebar.push(category);
        }

        return category;
    }

    public registerData(dataContext: IDataContext) {
        const data = dataContext.data;
        const dataProvider = dataContext.dataProvider;

        data.forEach((page: any) => {
            const categoryName = page.name;
            const items = page.items;

            // Add category
            const category = this.getOrCreateCategory(categoryName);

            // Add items
            items.forEach((item: any) => {
                let skill: Skill | null = null;
                if (item.skillID !== undefined) {
                    skill = dataProvider.skills.getObject(item.skillID);
                }

                category.addEntry(new SidebarEntry(
                    item.id,
                    item.icon,
                    item.route,
                    item.text,
                    item.page,
                    skill,
                ))
            });
        });
    }
}

