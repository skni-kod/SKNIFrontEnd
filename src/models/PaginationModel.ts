export class PaginationModel {
    public get pageCount(): number {
        return Math.ceil(this.itemCount / this.itemsPerPage);
    }

    constructor(public currentPage: number, public itemCount: number, public itemsPerPage: number) {
    }
}
