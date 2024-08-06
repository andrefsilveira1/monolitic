import ProductGateway from "../../gateway/product.gateway";
import { checkStockInputDto, checkStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: checkStockInputDto): Promise<checkStockOutputDto> {
        const product = await this._productRepository.find(input.productId);
        return {
            productId: product.id.id,
            stock: product.stock
        }
    }
}