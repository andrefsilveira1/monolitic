import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoiceItems.model";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/value-object/id.value-object";
import Address from "../../@shared/value-object/address.value_object";
import InvoiceItems from "../domain/invoice.items.entity";
import InvoiceRepostory from "./invoice.repository";

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

describe("Client repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a invoice", async () => {
        await InvoiceModel.create(
            {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: address.street,
                number: address.number,
                complement: address.complement,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
                items: invoice.items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }))
            },
            {
                include: [InvoiceItemsModel]
            }
        );

        const repository = new InvoiceRepostory();
        const result = await repository.find(invoice.id.id);
        expect(result.id.id).toEqual(invoice.id.id);
        expect(result.name).toEqual(invoice.name);
    });

    it("Should create a invoice", async () => {
        const repository = new InvoiceRepostory();
        await repository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne({where: {id: '1'}, include: InvoiceItemsModel})
        expect(invoiceDb?.id).toEqual(invoice.id.id);
        expect(invoiceDb?.name).toEqual(invoice.name);
        expect(invoiceDb?.document).toEqual(invoice.document);
        expect(invoiceDb?.street).toEqual(invoice.address.street);
        expect(invoiceDb?.complement).toEqual(invoice.address.complement);
        expect(invoiceDb?.state).toEqual(invoice.address.state);
        expect(invoiceDb?.number).toEqual(invoice.address.number);
        expect(invoiceDb?.city).toEqual(invoice.address.city);
        expect(invoiceDb?.zipCode).toEqual(invoice.address.zipCode);
    });
})