import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add Client usecase unit test", () => {
    it("Should add new client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);
        const input = {
            name: "client",
            email: "client@gmail.com",
            address: "address"
        };

        const result = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
    })
})