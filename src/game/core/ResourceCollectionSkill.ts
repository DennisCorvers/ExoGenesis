import { ResourceNode } from "./ResourceNode";
import { Skill } from "./Skill";

export abstract class ResourceCollectionSkill<T extends ResourceNode> extends Skill {
    protected m_maximumConcurrentNodes;
    protected m_progress: number;
    protected m_rewards: string[];
    protected m_nodes: T[];
    protected m_activeNode: T | null;

    constructor(id: string) {
        super(id);
        this.m_maximumConcurrentNodes = 1;
        this.m_progress = 0;
        this.m_rewards = [];
        this.m_nodes = [];
        this.m_activeNode = null;
    }

    public get progress(): number {
        return this.m_progress;
    }

    public get registeredNodes(): T[] {
        return this.m_nodes;
    }

    public get activeNode(): T | null {
        return this.m_activeNode;
    }

    public update(deltaTime: number) {
        if (this.canUpdate()) {
            this.m_progress += deltaTime;

            if (this.m_progress >= this.m_activeNode!.harvestingTime) {
                // Reset progress first before we set oncompletion.
                this.m_progress -= this.m_activeNode!.harvestingTime;
                this.completeAction();
                this.postCompleteAction();
            }
        }
    }

    public canUpdate(): boolean {
        return this.m_activeNode !== null;
    }

    public isActive(): boolean {
        return this.m_activeNode !== null;
    }

    public startHarvesting(node: T): void {
        this.m_activeNode = node;
        this.m_progress = 0;
    }

    public stopHarvesting(node: T): void {
        this.m_activeNode = null;
        this.m_progress = 0;

    }

    public registerNode(node: T): void {
        this.m_nodes.push(node);
    }
}
