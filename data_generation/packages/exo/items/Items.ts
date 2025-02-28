import { BaseTemplate } from "data_generation/BaseTemplate";

export interface ItemTemplate extends BaseTemplate {
    media: string;
    description: string;
}

export const items: ItemTemplate[] = [
    {
        id: "goldore",
        name: 'Gold Ore',
        media: "",
        description: "",
    },
    {
        id: "magnetiteore",
        name: 'Magnetite Ore',
        media: "",
        description: "",
    },
    {
        id: "malachiteore",
        name: 'Malachite Ore',
        media: "",
        description: "",
    },
]