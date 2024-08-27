import Product from "../domain/product.entity";
import { CreateProductInputDto } from "../usecase/create-product/create-product.dto";
import CreateProductUseCase from "../usecase/create-product/create-product.usecase";
import FindAllProductsUseCse from "../usecase/find-all-products/find-all-products-usecase";
import FindProductUseCse from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";


export interface UseCaseProps {
    findUseCase: FindProductUseCse
    findAllUseCase: FindAllProductsUseCse
    createUseCase: CreateProductUseCase
}
export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: FindProductUseCse;
    private _findAllUseCase: FindAllProductsUseCse;
    private _createUseCase: CreateProductUseCase;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase
        this._findAllUseCase = props.findAllUseCase
        this._createUseCase = props.createUseCase
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(id)
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute();
    }

    async create(input: CreateProductInputDto): Promise<Product> {
        const product = await this._createUseCase.execute(input);
        return product;
    }
}