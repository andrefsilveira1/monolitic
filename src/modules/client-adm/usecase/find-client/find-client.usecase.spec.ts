import Address from "../../../@shared/value-object/address.value_object";
import Id from "../../../@shared/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";


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
    name: "Client 1",
    email: "client@gmail.com",
    address: address,
    document: "000",
});


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    }
}

describe("Find Client usecase unit test", () => {
    it("Should find client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);
        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);
        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
    })
})