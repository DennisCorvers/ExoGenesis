import { Package } from "@game/core/Package";
import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { MineralNode } from "./requirements/MineralNode";
import { IDataProvider } from "@game/data/IDataProvider";

export class MineralHarvesting extends ResourceCollectionSkill<MineralNode> {
  constructor(pkg: Package) {
    super(pkg, 'mining', 'Mining', '/assets/images/skills/mining/mining.svg');

  }

  public registerData(pkg: Package, data: any, dataProvider: IDataProvider) {
    // Override already set data?
    data.recipes.forEach((recipeData: any) => {
      super.registerRecipe(new MineralNode(pkg, recipeData, dataProvider));
    });

    super.registerData(pkg, data, dataProvider);
  }
}
