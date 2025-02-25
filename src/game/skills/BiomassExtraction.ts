import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { SingleResourceRecipe } from "./requirements/SingleResourceRecipe";

export class BiomassExtraction extends ResourceCollectionSkill<SingleResourceRecipe> {

  constructor() {
    super("Biomass Extraction");

    //super.registerRecipe(new BiomassNode("Tree", 10, 5, 3.000, ["Log"]));
    //super.registerRecipe(new BiomassNode("Plant", 5, 1, 2.500, ["Plant Fibre"]));
  }
}
