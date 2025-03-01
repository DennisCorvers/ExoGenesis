interface SidebarCategory {
    name: string;
    items: SidebarItem[];
}

interface SidebarItem {
    id: string;
    icon: string;
    route: string;
    page: string;
    text: string;
    skillID?: string;
}

export const sidebar: SidebarCategory[] = [
    {
        name: "Player",
        items: [
            {
                id: "storage",
                icon: "storage-icon.png",
                route: "/player/storage",
                text: "Storage",
                page: "",
            },
            {
                id: "inventory",
                icon: "inventory-icon.png",
                route: "/player/inventory",
                text: "Inventory",
                page: "",
            },
            {
                id: "statistics",
                icon: "statistics-icon.png",
                route: "/player/statistics",
                text: "Statistics",
                page: "",
            },
        ],
    },
    {
        name: "Navigation",
        items: [],
    },
    {
        name: "Combat",
        items: [],
    },
    {
        name: "Gathering",
        items: [
            {
                id: "mineralharvesting-sidebar",
                icon: "/assets/images/skills/mineralharvesting/mineralharvesting.svg",
                route: "/mineralharvesting-page",
                text: "Mineral Harvesting",
                skillID: "exo.mineralharvesting",
                page: "mineralharvesting/MineralHarvestingUI",
            },
            {
                id: "biomassextraction-sidebar",
                icon: "/assets/images/skills/mineralharvesting/biomassextraction.svg",
                route: "/biomassextraction-page",
                text: "Biomass Extraction",
                skillID: "exo.biomassextraction",
                page: "biomassextraction/BiomassExtractionUI",
            },
        ],
    },
    {
        name: "Synthesis",
        items: [],
    },
    {
        name: "Settings",
        items: [],
    },
];