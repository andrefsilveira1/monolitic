import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUseCse implements UseCaseInterface {
    constructor(private productRepository: ProductGateway){}

    async execute(): Promise<any> {
        const products = await this.productRepository.findAll();
        return {
            products: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            }))
        }
    }
}