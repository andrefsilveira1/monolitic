import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client Adm Facade test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
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
            address: "address",
        }
        await facade.add(input);

        const client = await ClientModel.findOne({where: {id: "1"}});

        expect(client?.id).toEqual(input.id);
        expect(client?.name).toEqual(input.name);
        expect(client?.email).toEqual(input.email);
        expect(client?.address).toEqual(input.address);
    });

    it("Should find a client", async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: "client",
            email: "client@gmail.com",
            address: "address",
        }
        await facade.add(input);


        const client = await facade.find({id: '1'});

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.address).toBe(input.address);
    })
})