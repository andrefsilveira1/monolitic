import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _generateUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUseCase;
        this._generateUsecase = usecaseProps.generateUseCase;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        const invoice = await this._generateUsecase.execute(input);
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
            items: invoice.items,
            total: invoice.total,
        }
    }
    
    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        const invoice = await this._findUsecase.execute(input);
        return {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items,
            total: invoice.total,
            createdAt: invoice.createdAt
        }
    }

}