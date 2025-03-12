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

        this.storage.addItem(pickaxe, 1);
        const skill = <MineralHarvestingState>this.skills.getSkillStateByID('exo.mining');
        skill.selectedPickaxe = <Miningtool>pickaxe;

        const goldOre = this.gameContext.items.getObject('exo.goldore')
        this.storage.addItem(goldOre, 1);
        this.storage.items.forEach(x => {
            x.isLocked = true;
        });

        this.storage.removeAllOfItem(goldOre);
        const go = this.storage.getItem(goldOre);
        this.storage.moveItemsToTab([go], null);
    }
}