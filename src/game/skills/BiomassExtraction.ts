import { Package } from "@game/core/Package";
import { ResourceCollectionSkill } from "./ResourceCollectionSkill";
import { SimpleHarvestRecipe } from "./requirements/SimpleHarvestRecipe";
import { IDataContext } from "@game/data/IDataContext";

export class BiomassExtraction extends ResourceCollectionSkill<SimpleHarvestRecipe> {
  constructor(pkg: Package) {
    super(pkg, 'biomassextraction', 'Biomass Extraction', '/assets/images/skills/biomassextraction/biomassextraction.svg');

  }

  public registerData(dataContext: IDataContext) {
    const skillData = dataContext.data;
    const dataProvider = dataContext.dataProvider;

    super.registerData(dataContext);
  }
}

