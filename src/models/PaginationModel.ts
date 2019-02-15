export class PaginationModel {
    public get pageCount(): number {
        return Math.ceil(this.itemCount / this.itemsPerPage);
    }

    constructor(public itemCount: number, public itemsPerPage: number) {
    }
}
