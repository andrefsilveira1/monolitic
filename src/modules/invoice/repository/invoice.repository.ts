import Address from "../../@shared/value-object/address.value_object";
import Id from "../../@shared/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../domain/invoice.items.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoiceItems.model";

export default class InvoiceRepostory implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create(
            {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
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
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: { id }, include: InvoiceItemsModel });

        if (!invoice) {
            throw new Error("Invoice not found");
        }

        const address = new Address({
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
        });
        const invoiceItems = invoice.items.map((item) =>
            new InvoiceItems({
                id: new Id(item.id) || item.id,
                name: item.name,
                price: item.price
            }));

        return new Invoice({
            id: new Id(invoice.id) || invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: address,
            items: invoiceItems,
        })
    }
}