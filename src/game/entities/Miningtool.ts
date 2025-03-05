import { Package } from "@game/core/Package";
import { Item } from "./Item";

export class Miningtool extends Item {
    private m_hardness: number;
    private m_damage: number;
    private m_requiredLevel: number;

    public get hardness(): number {
        return this.m_hardness;
    }

    public get damage(): number {
        return this.m_damage;
    }

    public get requiredLevel(): number {
        return this.m_requiredLevel;
    }

    constructor(pkg: Package, data: any) {
        super(pkg, data)
        this.m_hardness = data.hardness;
        this.m_damage = data.damage;
        this.m_requiredLevel = data.requiredLevel;
    }
}