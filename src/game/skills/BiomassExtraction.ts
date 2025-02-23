import { ResourceCollectionSkill } from "../core/ResourceCollectionSkill";
import { EventBus } from "../events/EventBus";
import { BiomassExtractionEvent } from "../events/BiomassExtractionEvent";
import { BiomassNode } from "./BiomassNode"

export class BiomassExtraction extends ResourceCollectionSkill<BiomassNode> {

  constructor() {
    super("Biomass Extraction");

    super.registerNode(new BiomassNode("Tree", 10, 5, 3.000, ["Log"]));
    super.registerNode(new BiomassNode("Plant", 5, 1, 2.500, ["Plant Fibre"]));
  }

  public completeHarvesting(node: BiomassNode) {
    const event = new BiomassExtractionEvent(node);
    EventBus.instance.publish(event);
  }
}
