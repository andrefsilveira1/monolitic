import useCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-admin.facade.interface";

export interface UseCasesProps {
    addUseCase: useCaseInterface;
    stockUseCase: useCaseInterface
}
export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: useCaseInterface;
    private _checkStockUseCase: useCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._addUseCase = usecasesProps.addUseCase
        this._checkStockUseCase = usecasesProps.stockUseCase
    }
    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
}