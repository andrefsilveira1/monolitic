import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCse from "../usecase/find-all-products/find-all-products-usecase";
import FindProductUseCse from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFactory {
    static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findUseCase = new FindProductUseCse(productRepository);
        const findAllUseCase = new FindAllProductsUseCse(productRepository);
        const facade = new StoreCatalogFacade({
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase,
        });

        return facade;
    }
}