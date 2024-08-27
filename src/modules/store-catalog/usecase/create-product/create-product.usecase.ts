import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { CreateProductInputDto } from "./create-product.dto";

export default class CreateProductUseCase implements UseCaseInterface {
    constructor(private productRepository: ProductGateway){}

    async execute(input: CreateProductInputDto): Promise<Product> {
        const product = await this.productRepository.create({
            id: input.id,
            name: input.name,
            description: input.description,
            salesPrice: input.salesPrice,
        });

        return product;
    }
}