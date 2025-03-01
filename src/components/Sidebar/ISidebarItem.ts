export interface ISidebarItem {
    readonly id: string;
    readonly icon: string;
    readonly name: string;
    readonly route: string;
    readonly info?: string;
}