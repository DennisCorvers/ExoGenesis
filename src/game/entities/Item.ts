import { NamedObject } from "../core/NamedObject";
import { Package } from "@game/core/Package";

export class Item extends NamedObject {
    private m_media: string;
    private m_description: string;
    private m_type: string;
    private m_isStackable: boolean;

    public get media(): string {
        return this.m_media;
    }

    public get description(): string {
        return this.m_description;
    }

    public get type(): string {
        return this.m_type;
    }

    public get isStackable(): boolean{
        return this.m_isStackable;
    }

    constructor(pkg: Package, data: any) {
        super(pkg, data.id, data.name)

        this.m_media = data.media;
        this.m_description = data.description;
        this.m_type = data.type;
        this.m_isStackable = data.stackable;
    }
}