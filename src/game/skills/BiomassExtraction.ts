import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { SimpleHarvestRecipe } from "./requirements/SimpleHarvestRecipe";

export class BiomassExtraction extends ResourceCollectionSkill<SimpleHarvestRecipe> {

  constructor() {
    super('exo', "Biomass Extraction");

    //super.registerRecipe(new BiomassNode("Tree", 10, 5, 3.000, ["Log"]));
    //super.registerRecipe(new BiomassNode("Plant", 5, 1, 2.500, ["Plant Fibre"]));
  }
}
