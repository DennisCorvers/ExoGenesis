import { Item } from "../entities/Item";
import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { SimpleHarvestRecipe } from "./requirements/SimpleHarvestRecipe";

export class MineralHarvesting extends ResourceCollectionSkill<SimpleHarvestRecipe> {

  static Name: string = "MineralHarvesting";

  constructor() {
    super('exo', MineralHarvesting.Name);
    const item1 = new Item('exo', "Magnetite Ore");
    const item2 = new Item('exo', "Malachite Ore");
    const item3 = new Item('exo', "Gold Ore");
    super.registerRecipe(new SimpleHarvestRecipe('exo', "Magnetite Ore", item1, 1, 5, 1, 3));
    super.registerRecipe(new SimpleHarvestRecipe('exo', "Malachite Ore", item2, 1, 10, 3, 2));
    super.registerRecipe(new SimpleHarvestRecipe('exo', "Gold Ore", item3, 2, 15, 5, 1.5));
  }
}
