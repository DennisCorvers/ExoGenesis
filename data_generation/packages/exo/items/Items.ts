import { Item } from "@game/entities/Item";

export type ItemTemplate = Pick<Item, 'name' >;

export const items: ItemTemplate[] = [
    { name: 'Gold Ore' },
    { name: 'Magnetite Ore' },
    { name: 'Malachite Ore' },
]