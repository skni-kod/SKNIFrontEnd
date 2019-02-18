export class PaginationContainer<T> {
    public count!: number;
    public next!: string;
    public previous!: string;
    public results!: T[];
}
