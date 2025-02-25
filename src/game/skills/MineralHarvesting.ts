import { Item } from "../entities/Item";
import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { BaseRecipe } from "./requirements/BaseRecipe";
import { SingleResourceRecipe } from "./requirements/SingleResourceRecipe";

export class MineralHarvesting extends ResourceCollectionSkill<SingleResourceRecipe> {

  static Name: string = "MineralHarvesting";

  constructor() {
    super(MineralHarvesting.Name);
    const item1 = new Item("Magnetite Ore");
    const item2 = new Item("Malachite Ore");
    const item3 = new Item("Gold Ore");
    super.registerRecipe(new SingleResourceRecipe("Magnetite Ore", item1, 1, 5, 1, 3));
    super.registerRecipe(new SingleResourceRecipe("Malachite Ore", item2, 1, 10, 3, 2));
    super.registerRecipe(new SingleResourceRecipe("Gold Ore", item3, 2, 15, 5, 1.5));
  }
}
