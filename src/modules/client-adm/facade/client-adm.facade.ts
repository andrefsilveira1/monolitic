import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";


export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    addUsecase: UseCaseInterface
}
export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _addUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUsecase;
        this._addUsecase = usecaseProps.addUsecase
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        const client = await this._findUsecase.execute(input);

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            address: client.address,
            document: client.document,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}