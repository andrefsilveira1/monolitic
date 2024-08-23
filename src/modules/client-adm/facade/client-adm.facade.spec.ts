import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import Address from "../../@shared/value-object/address.value_object";

const address = new Address({
    street: "street",
    number: "456",
    complement: "Apt 789",
    city: "Springfield",
    state: "IL",
    zipCode: "62704"
});

describe("Client Adm Facade test", () => {
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


    it("Should create a client", async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: "client",
            email: "client@gmail.com",
            document: "000",
            address: address,
        }
        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });


        expect(client?.id).toEqual(input.id);
        expect(client?.name).toEqual(input.name);
        expect(client?.email).toEqual(input.email);
        expect(client?.street).toEqual(input.address.street);
        expect(client?.city).toEqual(input.address.city);
        expect(client?.number).toEqual(input.address.number);
        expect(client?.state).toEqual(input.address.state);
        expect(client?.complement).toEqual(input.address.complement);
        expect(client?.zipCode).toEqual(input.address.zipCode);
        expect(client?.document).toEqual(input.document)
    });

    it("Should find a client", async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: "client",
            email: "client@gmail.com",
            address: address,
            document: "000",
        }
        await facade.add(input);


        const client = await facade.find({ id: '1' });

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.address.street).toBe(input.address.street);
        expect(client.address.state).toBe(input.address.state);
        expect(client.address.zipCode).toBe(input.address.zipCode);
        expect(client.address.city).toBe(input.address.city);
        expect(client.address.complement).toBe(input.address.complement);
        expect(client.address.number).toBe(input.address.number);
    })
})