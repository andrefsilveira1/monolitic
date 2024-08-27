import Product from "../domain/product.entity";
import { CreateProductInputDto } from "../usecase/create-product/create-product.dto";

export default interface ProductGateway {
    findAll(): Promise<Product[]>;
    find(id: string): Promise<Product>;
    create(input: CreateProductInputDto): Promise<void>;
}