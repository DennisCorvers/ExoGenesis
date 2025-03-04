import { NamedObject } from "../core/NamedObject";
import { Package } from "@game/core/Package";

export class Item extends NamedObject {
    private m_media: string;
    private m_description: string;

    public get media(): string {
        return this.m_media;
    }

    public get description(): string {
        return this.m_description;
    }

    constructor(pkg : Package, data : any) {
        const item = data;
        super(pkg, data.id, data.name)

        this.m_media = data.media;
        this.m_description = data.description;
    }
}