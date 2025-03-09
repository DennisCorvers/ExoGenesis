import { Package } from "@game/core/Package";
import { BaseRecipe } from "./requirements/BaseRecipe";
import { HarvestRecipe } from "./requirements/HarvestRecipe";
import { Skill } from "./Skill";
import { IDataProvider } from "@game/data/IDataProvider";

export abstract class ResourceCollectionSkill<T extends HarvestRecipe> extends Skill {
    protected m_maximumConcurrentNodes;
    protected m_nodes: Map<string, T>;

    constructor(pkg: Package, id: string, name: string, media: string) {
        super(pkg, id, name, media);
        this.m_maximumConcurrentNodes = 0;
        this.m_nodes = new Map<string, T>();
    }

    public get maximumConcurrentNodes(): number {
        return this.m_maximumConcurrentNodes;
    }

    public get registeredNodes(): T[] {
        return [...this.m_nodes.values()];
    }

    public registerRecipe(node: T): void {
        this.m_nodes.set(node.id, node);
    }

    public registerData(pkg: Package, data: any, dataProvider: IDataProvider) {
        this.m_maximumConcurrentNodes = data.maximumConcurrentNodes ?? this.m_maximumConcurrentNodes;
        super.registerData(pkg, data, dataProvider);
    }

    // We just check if any of the resourcenodes is the provided recipe.
    // That's good enough, right?
    public isValidRecipe(recipe: BaseRecipe): boolean {
        const node = this.m_nodes.get(recipe.id);
        return node != null;
    }
}
