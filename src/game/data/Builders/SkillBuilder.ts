import { Package } from "@game/core/Package";
import { BiomassExtraction, MineralHarvesting, Skill } from "@game/skills";
import { IDataContext } from "../IDataContext";
import { NamedObjectRegistry } from "@game/core/Registries/NamedObjectRegistry";

export class SkillBuilder {
    public static setupSkills(defaultPackage: Package, skillRegistry: NamedObjectRegistry<Skill>) {
        skillRegistry.registerObject(new MineralHarvesting(defaultPackage));
        skillRegistry.registerObject(new BiomassExtraction(defaultPackage));
    }

    public static registerSkillData(dataContext: IDataContext) {
        const data = dataContext.data;
        const provider = dataContext.dataProvider;

        data.forEach((skillData: any) => {
            const skill = provider.skills.getObject(skillData.id);
            skill.registerData(dataContext);
        });
    }
}