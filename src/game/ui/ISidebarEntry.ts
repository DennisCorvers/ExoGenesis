import { Skill } from "@game/skills/Skill"

export interface ISidebarCategory {
    get name(): string;
    get entries(): ISidebarEntry[];
}

export interface ISidebarEntry {
    get id(): string;
    get icon(): string;
    get route(): string;
    get text(): string;
    get module(): string;
    get isSkill(): boolean;
    get skill(): Skill | null;
}