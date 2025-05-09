
export class Pageable<T> {

    public totalElements : Number;
    public totalPages : Number;
    public pageNumber : Number;
    public condition : Object = {};
    public content : Array<T> = [];

    public constructor(data : any) {
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageNumber;
        this.condition = data.condition;
    }


    public setContent(ts : Array<T>) {
        this.content = ts;
    }

}