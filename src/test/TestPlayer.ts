import { Miningtool } from "@game/entities/Miningtool";
import { Player } from "@game/entities/Player";
import { MineralHarvestingState } from "@game/state";

export class TestPlayer extends Player {
    public loadData(): void {
        console.log("Loading test player...")

        this.setPickaxe();
    }

    private setPickaxe() {
        const pickaxe = this.gameContext.items.objects.find(x => {
            return x.type == "pickaxe";
        });

        if (pickaxe == null) {
            console.error("No pickaxe found in inventory.");
            return;
        }

        this.inventory.addItem(pickaxe, 1);
        const skill = <MineralHarvestingState>this.skillManager.getSkillStateByID('exo.mineralharvesting');
        skill.selectedPickaxe = <Miningtool>pickaxe;
    }
}