import { BaseRecipe } from "./requirements/BaseRecipe";
import { HarvestRecipe } from "./requirements/HarvestRecipe";
import { Skill } from "./Skill";

export abstract class ResourceCollectionSkill<T extends HarvestRecipe> extends Skill {
    protected m_maximumConcurrentNodes;
    protected m_nodes: Map<string, T>;

    constructor(namespace: string, name: string) {
        super(namespace, name);
        this.m_maximumConcurrentNodes = 1;
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

    // We just check if any of the resourcenodes is the provided recipe.
    // That's good enough, right?
    public isValidRecipe(recipe: BaseRecipe): boolean {
        const node = this.m_nodes.get(recipe.id);
        return node != null;
    }
}
