import Product from "../domain/product.entity";
import { CreateProductInputDto } from "../usecase/create-product/create-product.dto";

export interface FindStoreCatalogFacadeInputDto {
    id: string
}

export interface FindStoreCatalogFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }
}


export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
    create(input: CreateProductInputDto): Promise<Product>;
}