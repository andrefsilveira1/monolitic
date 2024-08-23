import { CreatedAt, Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/value-object/id.value-object";
import Address from "../../@shared/value-object/address.value_object";

describe("Client repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("Should find a client", async () => {
        const client = await ClientModel.create({
            id: '1',
            name: "client",
            email: "client@gmail.com",
            street: "street",
            number: "456",
            document: "000",
            complement: "Apt 789",
            city: "Springfield",
            state: "IL",
            zipCode: "62704",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address.street).toEqual(client.street);
        expect(result.address.number).toEqual(client.number);
        expect(result.address.complement).toEqual(client.complement);
        expect(result.address.city).toEqual(client.city);
        expect(result.address.state).toEqual(client.state);
        expect(result.address.zipCode).toEqual(client.zipCode);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });

    it("Should create a client", async () => {
        const address = new Address({
            street: "street",
            number: "456",
            complement: "Apt 789",
            city: "Springfield",
            state: "IL",
            zipCode: "62704"
        });

        const client = new Client({
            id: new Id('1'),
            name: "client",
            email: "client@gmail.com",
            address: address,
            document: "000",
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientdb = await ClientModel.findOne({ where: { id: "1" } });

        expect(clientdb?.id).toEqual(client.id.id);
        expect(clientdb?.name).toEqual(client.name);
        expect(clientdb?.email).toEqual(client.email);
        expect(clientdb?.street).toEqual(client.address.street);
        expect(clientdb?.createdAt).toEqual(client.createdAt);
        expect(clientdb?.updatedAt).toEqual(client.updatedAt);
    })
})