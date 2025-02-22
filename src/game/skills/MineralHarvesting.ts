import { ResourceCollectionSkill } from "../core/ResourceCollectionSkill";
import { EventBus } from "../events/EventBus";
import { MineralHarvestingActionEvent } from "../events/MineralHarvestingEvent";
import { MineralNode } from "./MineralNode"

export class MineralHarvesting extends ResourceCollectionSkill<MineralNode> {

  constructor() {
    super("Mineral Harvesting");

    super.registerNode(new MineralNode("Magnetite", 10, 5, 3.000, ["Magnetite Ore"]));
    super.registerNode(new MineralNode("Malachite", 5, 1, 2.500, ["Malachite Ore"]));
    super.registerNode(new MineralNode("Gold", 5, 1, 1.500, ["Gold Ore"]));
  }

  public completeHarvesting(node: MineralNode) {
    const event = new MineralHarvestingActionEvent(node);
    EventBus.instance.publish(event);
  }
}
