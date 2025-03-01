import { ISidebarCategory, ISidebarEntry } from "./ISidebarEntry";
import { Skill } from "@game/skills/Skill";

export class SidebarCategory implements ISidebarCategory {
    private m_name: string;
    private m_entries: SidebarEntry[];

    constructor(name: string) {
        this.m_name = name;
        this.m_entries = [];
    }

    public get name(): string {
        return this.m_name;
    }

    public get entries(): SidebarEntry[] {
        return this.m_entries;
    }

    public addEntry(entry: SidebarEntry): void {
        this.m_entries.push(entry);
    }
}

export class SidebarEntry implements ISidebarEntry {
    private m_id: string;
    private m_icon: string;
    private m_route: string;
    private m_text: string;
    private m_module: string;
    private m_skill: Skill | null;

    constructor(id: string, icon: string, route: string, text: string, module: string, skill: Skill | null) {
        this.m_id = id;
        this.m_icon = icon;
        this.m_route = route;
        this.m_text = text;
        this.m_module = module;
        this.m_skill = skill;
    }

    public get id(): string {
        return this.m_id;
    }

    public get icon(): string {
        return this.m_icon;
    }

    public get route(): string {
        return this.m_route;
    }

    public get text(): string {
        return this.m_text;
    }

    public get module(): string {
        return this.m_module;
    }

    public get isSkill(): boolean {
        return this.m_skill != null;
    }

    public get skill(): Skill | null {
        return this.m_skill || null;
    }
}