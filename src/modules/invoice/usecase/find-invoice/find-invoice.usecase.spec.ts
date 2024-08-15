import Address from "../../../@shared/value-object/address.value_object";
import Id from "../../../@shared/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice.items.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address({
    street: "123 Main St",
    number: "456",
    complement: "Apt 789",
    city: "Springfield",
    state: "IL",
    zipCode: "62704"
  });

const invoice = new Invoice({
  id: new Id('1'),
  name: "John Doe",
  document: "123.456.789-00",
  address: address,
  items: [
    new InvoiceItems({ id: new Id('1'), name: "Laptop", price: 999.99 }),
    new InvoiceItems({ id: new Id('2'), name: "Mouse", price: 49.99 })
  ],
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}


describe("Find invoice unit tests", () => {
    it("Should find a invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);
        const input = {
            id: '1'
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
    });
})