import { GameData } from "./packages/exo/GameData";
import { DataContainer } from "./DataContainer"

export class DataGenerator {
    public static serialize(packageID: string): string {
        const pkg = this.getPackage(packageID);
        return JSON.stringify(pkg);

    }

    private static getPackage(packageID: string): DataContainer {
        if (packageID === 'exo') {
            return new DataContainer(packageID, 'ExoGenesis', new GameData());
        }

        throw Error(`Provided namespace ${packageID} does not exist in packages.`);
    }
}