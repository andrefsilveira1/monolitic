import Id from "../../../@shared/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {
    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {
            id: new Id(input.id) || input.id ,
            name: input.name,
            email: input.email,
            address: input.address,
            document: input.document
        };
        
        const client = new Client(props);
        this._clientRepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}