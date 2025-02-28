import { Package } from "@game/core/Package";
import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { SimpleHarvestRecipe } from "./requirements/SimpleHarvestRecipe";
import { IDataContext } from "@game/data/IDataContext";

export class MineralHarvesting extends ResourceCollectionSkill<SimpleHarvestRecipe> {
  constructor(pkg: Package) {
    super(pkg, 'mineralharvesting', 'Mineral Harvesting', '/assets/images/skills/mineralharvesting/mineralharvesting.svg');

  }

  public registerData(dataContext: IDataContext) {
    const skillData = dataContext.data;
    const dataProvider = dataContext.dataProvider;

    // Override already set data?
    skillData.recipes.forEach((recipeData: any) => {
      super.registerRecipe(new SimpleHarvestRecipe(dataContext.packageInfo, recipeData, dataProvider));
    });

    super.registerData(dataContext);
  }
}
