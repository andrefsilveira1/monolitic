import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemsModel } from "../repository/invoiceItems.model";
import InvoiceFacade from "./invoice.facade";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import Address from "../../@shared/value-object/address.value_object";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/value-object/id.value-object";
import InvoiceItems from "../domain/invoice.items.entity";

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

describe("Invoice facade test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should generate a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

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

        await facade.generate(input);

        const invoice = await InvoiceModel.findOne({where: {id: '1'}, include: [InvoiceItemsModel]})
        expect(invoice?.id).toEqual(input.id);
        expect(invoice?.name).toEqual(input.name);
        expect(invoice?.street).toEqual(input.street);
        expect(invoice?.number).toEqual(input.number);
        expect(invoice?.complement).toEqual(input.complement);
        expect(invoice?.city).toEqual(input.city);
        expect(invoice?.state).toEqual(input.state);
        expect(invoice?.zipCode).toEqual(input.zipCode);
    });

    it("Should find a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();
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

        const input = {
            id: '1'
        };

        const findInvoice = await facade.find(input);
        expect(input.id).toEqual(findInvoice.id);
        expect(invoice?.name).toEqual(findInvoice.name);
        expect(invoice?.address.street).toEqual(findInvoice.address.street);
        expect(invoice?.address.number).toEqual(findInvoice.address.number);
        expect(invoice?.address.complement).toEqual(findInvoice.address.complement);
        expect(invoice?.address.city).toEqual(findInvoice.address.city);
        expect(invoice?.address.state).toEqual(findInvoice.address.state);
        expect(invoice?.address.zipCode).toEqual(findInvoice.address.zipCode);

    })
})