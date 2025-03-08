import { Package } from "@game/core/Package";
import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { SimpleHarvestRecipe } from "./requirements/SimpleHarvestRecipe";
import { IDataProvider } from "@game/data/IDataProvider";

export class BiomassExtraction extends ResourceCollectionSkill<SimpleHarvestRecipe> {
  constructor(pkg: Package) {
    super(pkg, 'biomassextraction', 'Biomass Extraction', '/assets/images/skills/biomassextraction/biomassextraction.svg');

  }

  public registerData(pkg: Package, data: any, dataProvider: IDataProvider) {
    super.registerData(pkg, data, dataProvider);
  }
}

