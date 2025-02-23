export interface IUpdatable {
    start(): void;

    update(deltaTime: number): void;
}