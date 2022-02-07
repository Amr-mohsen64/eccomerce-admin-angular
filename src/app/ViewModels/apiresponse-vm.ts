export interface APIResponseVM {
    success: boolean,
    data: any,
    messages: string[],
    pageNp?: number,
    totalPage?: number,
    itemsPerPage?: number
}
