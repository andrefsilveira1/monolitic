import Address from "../../@shared/value-object/address.value_object";
import Id from "../../@shared/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            state: client.address.state,
            city: client.address.city,
            number: client.address.number,
            complement: client.address.complement,
            zipCode: client.address.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
    }

    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({ where: { id } });

        if (!client) {
            throw new Error("Client not found");
        }
        const address = new Address({
            street: client.street,
            number: client.number,
            city: client.city,
            complement: client.complement,
            zipCode: client.zipCode,
            state: client.state
        })
        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: address,
            document: client.document,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
    }
}