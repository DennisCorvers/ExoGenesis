import { GameData } from "./packages/exo/GameData";

export class GameRegistry {
    constructor() {

    }

    public static serialize(namespace: string): string {
        if (namespace === 'exo')
            return (new GameData()).serialize();

        throw Error(`Provided namespace ${namespace} does not exist in packages.`);
        
    }
}