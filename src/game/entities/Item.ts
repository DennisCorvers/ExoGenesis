import { IDataContext } from "@game/data/IDataContext";
import { NamedObject } from "../core/NamedObject";

export class Item extends NamedObject {
    private m_media: string;
    private m_description: string;

    constructor(dataContext: IDataContext) {
        const item = dataContext.data;
        super(dataContext.packageInfo, item.id, item.name)

        this.m_media = item.media;
        this.m_description = item.description;
    }
}