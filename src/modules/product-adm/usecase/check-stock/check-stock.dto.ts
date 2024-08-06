export interface checkStockInputDto {
    productId: string;
}


export interface checkStockOutputDto {
    productId: string;
    stock: number;
}