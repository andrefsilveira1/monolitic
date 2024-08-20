import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn(),
    }
}

describe("Generate invoice usecase unit test", () => {
    it("Should add new invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);
        const input = {
            id: '1',
            name: 'invoice',
            document: '0101010',
            street: 'Avenue null',
            number: '1000',
            complement: 'ap 1203',
            city: 'Natal',
            state: 'RN',
            zipCode: '123456',
            items: [
                {
                    id: '1',
                    name: 'item 1',
                    price: 500
                }
            ]
        };

        const result = await usecase.execute(input);
        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
    })
})