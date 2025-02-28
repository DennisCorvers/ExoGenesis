import { BaseTemplate } from "../../../BaseTemplate"

interface MineralHarvesting extends BaseTemplate {
    media: string,
    levelCap: number
    maximumConcurrentNodes: number,
    recipes: SkillRecipeTemplate[] | null,
}

export const mineralHarvesting: MineralHarvesting = {
    id: 'exo.mineralharvesting',
    name: 'Mineral Harvesting',
    media: "/assets/images/skills/mineralharvesting/mineralharvesting.svg",
    levelCap: 100,
    maximumConcurrentNodes: 1,
    recipes: null,
}

interface SkillRecipeTemplate extends BaseTemplate {
    id: string,
    name: string,
    item: string,
    amount: number,
    experienceReward: number,
    levelRequirement: number,
    actionTime: number
}

const recipes: SkillRecipeTemplate[] = [
    {
        id: 'magnetitevein',
        name: 'Magnetite Vein',
        item: 'exo.magnetiteore',
        amount: 1,
        experienceReward: 5,
        levelRequirement: 1,
        actionTime: 3
    },
    {
        id: 'malachiteore',
        name: 'Malachite Vein',
        item: 'exo.malachiteore',
        amount: 1,
        experienceReward: 10,
        levelRequirement: 3,
        actionTime: 2
    },
    {
        id: 'goldvein',
        name: 'Gold Vein',
        item: 'exo.goldore',
        amount: 2,
        experienceReward: 5,
        levelRequirement: 5,
        actionTime: 1.5
    },
];

mineralHarvesting.recipes = recipes;